'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TerminalPage() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    '<div class="ascii-art">███████╗███╗   ██╗███████╗███████╗</div>',
    '<div class="ascii-art">██╔════╝████╗  ██║██╔════╝██╔════╝</div>',
    '<div class="ascii-art">█████╗  ██╔██╗ ██║█████╗  ███████╗</div>',
    '<div class="ascii-art">██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║</div>',
    '<div class="ascii-art">███████╗██║ ╚████║███████╗███████║</div>',
    '<div class="ascii-art">╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝</div>',
    '<div class="ascii-art">DevOps Engineer & Computer Engineer</div>',
    '',
    "Enes'in Terminaline Hoşgeldiniz!",
    '',
    ' * GitHub:      https://github.com/eneserendp',
    ' * LinkedIn:    www.linkedin.com/in/enes-eren-demirpolat-3b1450220',
    ' * Medium:   https://medium.com/@demirpolateneseren',
    '',
    'Komutları görmek için "help" yazabilirsiniz.',
    'Son giriş: --:--:--', // Placeholder until client-side rendering
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on page load and scroll to bottom when output changes
  useEffect(() => {
    const input = document.getElementById('terminal-input');
    if (input) {
      input.focus();
    }

    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Set the login time on client-side only to avoid hydration mismatch
  useEffect(() => {
    setOutput((prev) => {
      const updatedOutput = [...prev];
      const loginIndex = updatedOutput.findIndex((line) =>
        line.startsWith('Son giriş:')
      );
      if (loginIndex !== -1) {
        updatedOutput[loginIndex] =
          'Son giriş: ' + new Date().toLocaleString('tr-TR');
      }
      return updatedOutput;
    });
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newCommand = command.trim();

      // Show current command in terminal even if empty
      setOutput((prev) => [...prev, `enes@terminal:~$ ${newCommand}`]);

      // Process command only if not empty
      if (newCommand) {
        // Add command to history
        setHistory((prev) => [...prev, newCommand]);
        setHistoryIndex(-1);

        // Process command with typing effect
        setIsTyping(true);
        setTimeout(() => {
          processCommand(newCommand);
          setIsTyping(false);
        }, 300);
      }

      // Clear input regardless of whether a command was entered
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate command history (up)
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate command history (down)
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      if (command.toLowerCase() === 'h') {
        setCommand('help');
      } else if (command.toLowerCase() === 'c') {
        setCommand('clear');
      } else if (command.toLowerCase() === 'e') {
        setCommand('exit');
      } else if (command.toLowerCase() === 'a') {
        setCommand('about');
      } else if (command.toLowerCase() === 'p') {
        setCommand('projects');
      } else if (command.toLowerCase() === 's') {
        setCommand('skills');
      } else if (command.toLowerCase() === 'co') {
        setCommand('contact');
      } else if (command.toLowerCase() === 'l') {
        setCommand('ls');
      } else if (command.toLowerCase() === 'b') {
        setCommand('banner');
      } else if (command.toLowerCase() === 'cv') {
        setCommand('cv');
      }
    }
  };

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase();

    if (command === 'clear') {
      setOutput([]);
    } else if (command === 'help' || command === 'man') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="command-title">📋 Kullanılabilir Komutlar:</div>',
        '  <span class="command-name">help, man</span>    - Bu yardım mesajını göster',
        '  <span class="command-name">clear</span>        - Terminal ekranını temizle',
        '  <span class="command-name">exit, logout</span> - Ana sayfaya dön',
        '  <span class="command-name">about</span>        - Hakkımda bilgileri göster',
        '  <span class="command-name">contact</span>      - İletişim bilgilerini göster',
        '  <span class="command-name">projects</span>     - Projelerimi listele',
        '  <span class="command-name">skills</span>       - Yeteneklerimi listele',
        '  <span class="command-name">banner</span>       - ASCII sanat bannerını göster',
        '  <span class="command-name">uname -a</span>     - Sistem bilgilerini göster',
        '  <span class="command-name">ls</span>           - Dizin içeriğini listele',
        '  <span class="command-name">date</span>         - Şu anki tarih ve zamanı göster',
        '  <span class="command-name">neofetch</span>     - Sistem bilgilerini göster',
        '  <span class="command-name">cv</span>           - CV\'mi indir',
        '',
        '<div class="command-title">💡 İpuçları:</div>',
        '  • Komut tamamlama için Tab tuşunu kullanın',
        '  • Komut geçmişinde gezinmek için ↑/↓ tuşlarını kullanın',
        '',
      ]);
    } else if (command === 'exit' || command === 'logout') {
      window.location.href = '/';
    } else if (command === 'about') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="section-header">📌 Hakkımda</div>',
        '',
        '2024 yılında Nevşehir Hacı Bektaş Veli Üniversitesi Bilgisayar Mühendisliği bölümünden mezun oldum. Üniversite yıllarımda başladığım Full-Stack Development serüvenim, zamanla sistemlerin altyapı tarafına duyduğum ilgiyle DevOps mühendisliği alanına evrildi. Günümüzde yazılım geliştirme süreçlerinin sadece kod yazmaktan ibaret olmadığını; sürdürülebilir, güvenli ve otomasyona dayalı sistemlerin ne denli kritik olduğunu deneyimleyerek öğreniyorum.',
        '',
        'Docker ve Kubernetes ile konteynerleşme teknolojilerine hâkimim; Jenkins, GitHub Actions gibi araçlarla CI/CD süreçleri kuruyor, Linux ortamlarında sistem yönetimi ve otomasyon üzerine çalışıyorum. Ayrıca AWS başta olmak üzere bulut bilişim servisleriyle ölçeklenebilir ve yüksek erişilebilirlik sağlayan çözümler geliştiriyorum. Python, Node.js ve SQL gibi diller ve teknolojilerle yazılım geliştirme tarafındaki yetkinliğimi korurken, altyapı ile yazılım arasında köprü kurmaya özen gösteriyorum.',
        '',
        'Teknolojiye olan tutkum, sadece teknik bilgi edinmekle sınırlı değil. Aynı zamanda problem çözme becerilerimi geliştirmek, ekip içi iş birliğini artırmak ve yürüttüğüm projelere gerçek anlamda değer katmak için sürekli öğrenmeye ve kendimi geliştirmeye büyük önem veriyorum.',
        '',
        'Yeni teknolojileri takip etmeyi, öğrendiklerimi uygulayarak pekiştirmeyi ve farklı ekiplerle birlikte üretmeyi seviyorum. Kariyer hedefim; modern yazılım süreçlerine katkı sağlayan, güvenli ve otomasyon odaklı sistemler inşa eden bir DevOps mühendisi olarak uzmanlaşmak.',
        '',
      ]);
    } else if (command === 'contact') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="section-header">📱 İletişim Bilgileri</div>',
        '  E-posta: eneserendp@gmail.com',
        '  Telefon: +90 507 167 0643',
        '  LinkedIn: www.linkedin.com/in/enes-eren-demirpolat-3b1450220',
        '  GitHub: https://github.com/eneserendp',
        '',
      ]);
    } else if (command === 'cv') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="section-header">📄 CV İndir</div>',
        '',
        '<div class="cv-download">',
        "  <p>CV'mi incelemek isterseniz aşağıdaki bağlantıdan indirebilirsiniz:</p>",
        '  <div class="download-button">',
        '    <a href="/EnesErenDemirpolat_CV.pdf" download class="cv-download-link">',
        '      <span class="download-icon">📥</span> CV\'mi İndir',
        '    </a>',
        '  </div>',
        '  <p class="cv-info">Son güncelleme: Nisan 2024</p>',
        '</div>',
        '',
      ]);
    } else if (command === 'projects') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="section-header">📂 Projelerim</div>',
        '',
        '<div class="project-item">',
        '  <div class="project-title">💝 valentines-day</div>',
        '  <div class="project-desc">Sevgililer Günü için özel interaktif uygulama</div>',
        '  <div class="project-tech">JavaScript</div>',
        '  <div class="project-link">🔗 <a href="https://github.com/eneserendp/valentines-day" target="_blank">github.com/eneserendp/valentines-day</a></div>',
        '</div>',
        '',
        '<div class="project-item">',
        '  <div class="project-title">🏠 Zaferusta</div>',
        '  <div class="project-desc">Bir Ustanın Web Sitesi</div>',
        '  <div class="project-tech">TypeScript</div>',
        '  <div class="project-link">🔗 <a href="https://github.com/eneserendp/Zaferusta" target="_blank">github.com/eneserendp/Zaferusta</a></div>',
        '</div>',
        '',
        '<div class="project-item">',
        '  <div class="project-title">🏢 TeknoEmlak</div>',
        '  <div class="project-desc">TeknoEmlak, gayrimenkul sektöründe dijital dönüşümü hızlandırmayı amaçlayan yenilikçi bir platform</div>',
        '  <div class="project-tech">JavaScript</div>',
        '  <div class="project-link">🔗 <a href="https://github.com/eneserendp/TeknoEmlak" target="_blank">github.com/eneserendp/TeknoEmlak</a></div>',
        '</div>',
        '',
        '<div class="project-item">',
        '  <div class="project-title">🍔 E-Yemek</div>',
        '  <div class="project-desc">Bir Yemek Şirketinin E-Ticaret Web Sitesi</div>',
        '  <div class="project-tech">TypeScript</div>',
        '  <div class="project-link">🔗 <a href="https://github.com/eneserendp/E-Yemek" target="_blank">github.com/eneserendp/E-Yemek</a></div>',
        '</div>',
        '',
        '<div class="project-item">',
        '  <div class="project-title">🏙️ MVC-ILE-ANKAVISIT-WEB-SITE</div>',
        '  <div class="project-desc">Web site</div>',
        '  <div class="project-tech">JavaScript</div>',
        '  <div class="project-link">🔗 <a href="https://github.com/eneserendp/MVC-ILE-ANKAVISIT-WEB-SITE" target="_blank">github.com/eneserendp/MVC-ILE-ANKAVISIT-WEB-SITE</a></div>',
        '</div>',
        '',

        '',
        'Daha fazla projeyi GitHub hesabımda görebilirsiniz: <a href="https://github.com/eneserendp?tab=repositories" target="_blank">github.com/eneserendp</a>',
        '',
      ]);
    } else if (command === 'skills') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="section-header">🚀 Yeteneklerim</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">🐳</span> <span class="skill-title">DevOps:</span></div>',
        '<div class="skill-item">Docker, Kubernetes, CI/CD, Jenkins</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">☁️</span> <span class="skill-title">Bulut:</span></div>',
        '<div class="skill-item">AWS, Azure, GCP</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">💻</span> <span class="skill-title">Programlama:</span></div>',
        '<div class="skill-item">JavaScript, TypeScript, Python</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">🌐</span> <span class="skill-title">Web:</span></div>',
        '<div class="skill-item">React, Next.js, Node.js</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">🛠️</span> <span class="skill-title">Araçlar:</span></div>',
        '<div class="skill-item">Git, GitHub, Terraform</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">🗄️</span> <span class="skill-title">Veritabanları:</span></div>',
        '<div class="skill-item">PostgreSQL, MongoDB, Redis</div>',
        '',
        '<div class="skill-category"><span class="skill-icon">🔌</span> <span class="skill-title">Ağ:</span></div>',
        '<div class="skill-item">TCP/IP, DNS, HTTP/HTTPS, Yük Dengeleme</div>',
        '',
      ]);
    } else if (command === 'ls' || command === 'dir') {
      setOutput((prev) => [
        ...prev,
        '',
        'hakkimda.md  iletisim.md  projeler/  yetenekler.md  EnesErenDemirpolat_CV.pdf',
        '',
      ]);
    } else if (command === 'banner') {
      setOutput((prev) => [
        ...prev,
        '',
        '<div class="ascii-art">███████╗███╗   ██╗███████╗███████╗</div>',
        '<div class="ascii-art">██╔════╝████╗  ██║██╔════╝██╔════╝</div>',
        '<div class="ascii-art">█████╗  ██╔██╗ ██║█████╗  ███████╗</div>',
        '<div class="ascii-art">██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║</div>',
        '<div class="ascii-art">███████╗██║ ╚████║███████╗███████║</div>',
        '<div class="ascii-art">╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝</div>',
        '<div class="ascii-art">DevOps Engineer & Computer Engineer</div>',
        '',
      ]);
    } else if (command === 'date') {
      const now = new Date();
      setOutput((prev) => [
        ...prev,
        '',
        now.toLocaleDateString('tr-TR') + ' ' + now.toLocaleTimeString('tr-TR'),
        '',
      ]);
    } else if (command === 'uname -a') {
      setOutput((prev) => [
        ...prev,
        '',
        'Linux enes-terminal 5.15.0-76-custom #83-Enes SMP Wed Jun 7 12:14:17 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux',
        '',
      ]);
    } else if (command === 'neofetch') {
      setOutput((prev) => [
        ...prev,
        '',
        '       _,met$$$$$gg.           enes@terminal',
        '    ,g$$$$$$$$$$$$$$$P.        -------------',
        '  ,g$$P"     """Y$$.".         OS: Enes Terminal v1.0',
        " ,$$P'              `$$$.      Host: Portfolio Website",
        ',$$P       ,ggs.     `$$b:     Kernel: 5.15.0-76-custom',
        "`d$$'     ,$P\"'   .    $$$     Uptime: Her zaman online",
        " $$P      d$'     ,    $$P     Packages: Sınırsız",
        " $$:      $$.   -    ,d$$'     Shell: next-js-shell",
        " $$;      Y$b._   _,d$P'       Terminal: next-js",
        ' Y$$.    `.`"Y$$$$P"\'          CPU: DevOps Engineer @ 3.9GHz',
        ' `$$b      "-.__               GPU: Fullstack Developer',
        '  `Y$$                         Memory: Sınırsız Hayal Gücü',
        '   `Y$$.                       ',
        '     `$$b.                     ',
        '       `Y$$b.                  ',
        '          `"Y$b._              ',
        '              `"""             ',
        '',
      ]);
    } else {
      setOutput((prev) => [
        ...prev,
        '',
        `'${command}' komutu bulunamadı. Kullanılabilir komutları görmek için 'help' yazın.`,
        '',
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#000000] text-[#FFFFFF] min-h-screen flex flex-col font-ubuntu"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Terminal Header */}
      <div
        className="bg-[#000000] px-4 py-2 flex justify-between items-center border-b border-[#00b300] text-[#00b300]"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] cursor-pointer shadow-sm"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] cursor-pointer shadow-sm"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] cursor-pointer shadow-sm"
            />
          </div>
          <span className="text-[#00b300] font-medium ml-3 tracking-wide flex items-center gap-1">
            <span>Terminal</span>
            <span className="text-xs text-[#00b300] opacity-80">
              - enes@terminal: ~
            </span>
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="px-3 py-1 text-[#00b300] hover:bg-[#1a1a1a] hover:text-[#00ff00] rounded transition-colors text-sm font-medium"
          >
            × Kapat
          </Link>
        </motion.div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-3 overflow-auto text-[#FFFFFF] custom-scrollbar bg-[#000000]"
        style={{
          backgroundColor: '#000000',
          fontFamily: "'Ubuntu Mono', monospace",
          color: '#FFFFFF',
        }}
      >
        {output.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className={`leading-relaxed whitespace-pre-wrap ${
              line.startsWith('enes@terminal')
                ? 'text-[#00b300] font-bold'
                : line === 'Kullanılabilir Komutlar:' ||
                  line === 'Hakkımda:' ||
                  line === 'İletişim Bilgileri:' ||
                  line === 'Projelerim:' ||
                  line === 'Yeteneklerim:' ||
                  line === 'İpuçları:'
                ? 'text-[#00b300] font-bold'
                : 'text-[#FFFFFF]'
            }`}
            style={{
              color:
                line.startsWith('enes@terminal') ||
                line === 'Kullanılabilir Komutlar:' ||
                line === 'Hakkımda:' ||
                line === 'İletişim Bilgileri:' ||
                line === 'Projelerim:' ||
                line === 'Yeteneklerim:' ||
                line === 'İpuçları:'
                  ? '#00b300'
                  : '#FFFFFF',
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#00b300]"
          >
            İşleniyor...
          </motion.div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#00b300] font-bold">enes@terminal:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent text-[#FFFFFF] outline-none pl-1"
            style={{ color: '#FFFFFF' }}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Custom scrollbar and Ubuntu font styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap');

        body {
          background-color: #000000;
          color: #ffffff;
        }

        .font-ubuntu {
          font-family: 'Ubuntu Mono', monospace;
        }

        .ascii-art {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #00b300;
          font-weight: bold;
          font-size: 0.6rem;
          letter-spacing: -0.5px;
        }

        @media (min-width: 640px) {
          .ascii-art {
            font-size: 1rem;
            letter-spacing: normal;
          }
        }

        .section-header {
          color: #00b300;
          font-weight: bold;
          font-size: 1.2em;
          border-bottom: 1px solid #00b300;
          padding-bottom: 0.2em;
          margin-bottom: 0.5em;
          display: inline-block;
        }

        .command-title {
          color: #00b300;
          font-weight: bold;
        }

        .command-name {
          color: #00ccff;
          font-weight: bold;
        }

        .skill-category {
          color: #ffffff;
          margin-top: 5px;
          margin-bottom: 2px;
        }

        .skill-icon {
          font-size: 1.2em;
          margin-right: 5px;
        }

        .skill-title {
          color: #00ccff;
          font-weight: bold;
        }

        .skill-item {
          color: #00b300;
          padding-left: 25px;
          opacity: 0.9;
        }

        .project-item {
          margin-bottom: 15px;
          padding-left: 5px;
          border-left: 2px solid #333;
        }

        .project-title {
          color: #00ccff;
          font-weight: bold;
          font-size: 1.1em;
        }

        .project-desc {
          color: #00b300;
          opacity: 0.9;
          padding-left: 15px;
        }

        .project-tech {
          color: #888;
          padding-left: 15px;
          font-style: italic;
        }

        .project-link {
          padding-left: 15px;
        }

        .project-link a {
          color: #00aa88;
          text-decoration: none;
        }

        .project-link a:hover {
          text-decoration: underline;
          color: #00ccaa;
        }

        .cv-download {
          padding: 10px;
          border: 1px dashed #333;
          margin: 10px 0;
          background-color: rgba(0, 30, 0, 0.3);
        }

        .download-button {
          margin: 15px 0;
          text-align: center;
        }

        .cv-download-link {
          background-color: #00b300;
          color: #000;
          font-weight: bold;
          padding: 8px 15px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
        }

        .cv-download-link:hover {
          background-color: #00ff00;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
        }

        .download-icon {
          margin-right: 6px;
        }

        .cv-info {
          font-size: 0.9em;
          color: #888;
          text-align: center;
          font-style: italic;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00b300;
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00ff00;
        }
      `}</style>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalPopup({ isOpen, onClose }: TerminalPopupProps) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newCommand = command.trim();
      if (newCommand) {
        setOutput((prev) => [...prev, `$ ${newCommand}`]);

        // Komut işleme
        if (newCommand.toLowerCase() === 'clear') {
          setOutput([]);
        } else if (newCommand.toLowerCase() === 'help') {
          setOutput((prev) => [
            ...prev,
            'Available commands:',
            '- help: Show this help message',
            '- clear: Clear the terminal',
          ]);
        } else {
          setOutput((prev) => [...prev, `Command executed: ${newCommand}`]);
        }

        setCommand('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center"
    >
      <div className="bg-[#1e1e1e] w-[800px] h-[500px] rounded-lg shadow-2xl flex flex-col animate-fadeIn">
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 flex justify-between items-center rounded-t-lg border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] cursor-pointer"></div>
            </div>
            <span className="text-gray-400 font-mono ml-3">Terminal</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl font-light"
          >
            ×
          </button>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-6 flex flex-col bg-[#1e1e1e]">
          <div className="flex-1 overflow-y-auto font-mono text-sm text-white mb-4 space-y-2">
            <div className="text-green-400 mb-4">
              Welcome to the terminal! Type 'help' for available commands.
            </div>
            {output.map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line}
              </div>
            ))}
          </div>

          {/* Command Input */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-green-500">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-white outline-none text-sm"
              placeholder="Type a command..."
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}

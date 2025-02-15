import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameMessage, Command } from '../types/game';
import { medicalCases } from '../data/cases';
import { HAWKEYE_QUOTES, SHIFT_DURATION, TIP_DELAY, OPTION_DELAY, INACTIVITY_DELAY } from '../constants';
import { formatCaseDescription } from '../utils/formatters';
import { generateMessageId } from '../utils/messageId';

const initialState: GameState = {
  supplies: [
    { id: '1', name: 'Morphine', type: 'medication', quantity: 10 },
    { id: '2', name: 'Surgical Kit', type: 'equipment', quantity: 3 },
    { id: '3', name: 'Bandages', type: 'equipment', quantity: 50 },
    { id: '4', name: 'Penicillin', type: 'medication', quantity: 15 },
  ],
  savedLives: 0,
  shiftTime: SHIFT_DURATION,
  status: 'available',
  isShiftActive: false,
  lastActionTime: Date.now(),
  completedCases: [],
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [messages, setMessages] = useState<GameMessage[]>([
    {
      id: generateMessageId(),
      content: 'Welcome to MASH 4077! Type "help" for available commands.',
      timestamp: Date.now(),
      type: 'system',
    },
  ]);

  const timerRef = useRef<NodeJS.Timeout>();
  const inactivityTimerRef = useRef<NodeJS.Timeout>();

  const addMessage = useCallback((content: string, type: GameMessage['type'] = 'info', image?: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: generateMessageId(),
        content,
        timestamp: Date.now(),
        type,
        image,
      },
    ]);
  }, []);

  // Handle countdown timers
  useEffect(() => {
    if (gameState.isShiftActive) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.shiftTime <= 0) {
            clearInterval(timerRef.current);
            return prev;
          }
          
          // Update tip timer if active
          const tipTimer = prev.tipTimer ? prev.tipTimer - 1 : undefined;
          
          // Update option timer if active
          const optionTimer = prev.processingOption ? (prev.optionTimer ? prev.optionTimer - 1 : undefined) : undefined;
          
          return {
            ...prev,
            shiftTime: prev.shiftTime - 1,
            tipTimer,
            optionTimer,
          };
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [gameState.isShiftActive]);

  // Handle inactivity reminder
  useEffect(() => {
    if (gameState.isShiftActive) {
      const checkInactivity = () => {
        const now = Date.now();
        const timeSinceLastAction = (now - gameState.lastActionTime) / 1000;
        
        if (timeSinceLastAction >= INACTIVITY_DELAY) {
          const randomQuote = HAWKEYE_QUOTES[Math.floor(Math.random() * HAWKEYE_QUOTES.length)];
          addMessage(`Hawkeye: "${randomQuote}"`, 'info');
          setGameState(prev => ({ ...prev, lastActionTime: now }));
        }
      };

      inactivityTimerRef.current = setInterval(checkInactivity, 5000); // Check every 5 seconds
      return () => clearInterval(inactivityTimerRef.current);
    }
  }, [gameState.isShiftActive, gameState.lastActionTime, addMessage]);

  const getNextCase = useCallback(() => {
    const availableCases = medicalCases.filter(
      c => !gameState.completedCases.includes(c.id)
    );
    if (availableCases.length === 0) return null;
    return availableCases[Math.floor(Math.random() * availableCases.length)];
  }, [gameState.completedCases]);

  const startShift = useCallback(() => {
    const nextCase = getNextCase();
    if (!nextCase) {
      addMessage("Congratulations! You have completed all available cases. More coming soon!", 'success');
      return;
    }

    setGameState(prev => ({
      ...prev,
      isShiftActive: true,
      shiftTime: SHIFT_DURATION,
      currentCase: nextCase,
      status: 'available',
      lastActionTime: Date.now(),
    }));

    addMessage('🔔 New shift starting! Incoming patients...', 'system', 'https://i.pinimg.com/originals/3b/0c/ee/3b0cee79173dcff1f8d3308fe9e259cb.jpg');
    addMessage(`\n**Current Case: ${nextCase.title}**\n`, 'medical');
    addMessage(formatCaseDescription(nextCase.description), 'medical');
    addMessage('\n**Treatment Options:**\n', 'system');
    nextCase.options.forEach(option => {
      addMessage(`${option.id.toUpperCase()}: ${option.text}`, 'info');
    });
  }, [addMessage, getNextCase]);

  const handleTip = useCallback(() => {
    if (!gameState.currentCase) return;
    
    if (gameState.tipRequested) {
      addMessage('Tip already requested! Please wait...', 'error');
      return;
    }

    setGameState(prev => ({ 
      ...prev, 
      tipRequested: true, 
      tipTimer: TIP_DELAY,
      lastActionTime: Date.now(),
    }));
    addMessage('Consulting with Colonel Potter...', 'info');
    
    const correctOption = gameState.currentCase.options.find(opt => opt.isCorrect);
    
    setTimeout(() => {
      addMessage(`Colonel Potter whispers: "${gameState.currentCase?.tip}"`, 'info');
      addMessage(`Hint: Consider option ${correctOption?.id.toUpperCase()}...`, 'info');
      setGameState(prev => ({ ...prev, tipRequested: false }));
    }, TIP_DELAY * 1000);
  }, [gameState.currentCase, gameState.tipRequested, addMessage]);

  const handleOption = useCallback((optionId: string) => {
    if (!gameState.currentCase || gameState.processingOption) return;

    const option = gameState.currentCase.options.find(opt => opt.id === optionId);
    if (!option) return;

    setGameState(prev => ({ 
      ...prev, 
      processingOption: true, 
      optionTimer: OPTION_DELAY,
      lastActionTime: Date.now(),
    }));
    addMessage('Attempting treatment...', 'info');

    setTimeout(() => {
      if (option.isCorrect) {
        addMessage('✅ ' + option.feedback, 'success');
        setGameState(prev => ({
          ...prev,
          savedLives: prev.savedLives + 1,
          completedCases: [...prev.completedCases, prev.currentCase!.id],
          currentCase: undefined,
          isShiftActive: false,
          processingOption: false,
        }));
        addMessage('Patient saved! Lives saved: ' + (gameState.savedLives + 1), 'success');
        
        // Start next case after a brief pause
        setTimeout(() => {
          startShift();
        }, 2000);
      } else {
        addMessage('❌ ' + option.feedback, 'error');
        addMessage('Try again! The patient needs the right treatment.', 'system');
        setGameState(prev => ({
          ...prev,
          processingOption: false,
        }));
      }
    }, OPTION_DELAY * 1000);
  }, [gameState.currentCase, gameState.processingOption, gameState.savedLives, addMessage, startShift]);

  const processCommand = useCallback(({ command, args }: Command) => {
    setGameState(prev => ({ ...prev, lastActionTime: Date.now() }));

    switch (command.toLowerCase()) {
      case 'start-shift':
        if (gameState.isShiftActive) {
          addMessage('Shift already in progress!', 'error');
          return;
        }
        startShift();
        break;
      case 'manual':
        setGameState(prev => ({ ...prev, status: 'reading-manual' }));
        addMessage('Opening Medical Field Manual...', 'system');
        addMessage('\n**MASH 4077 Field Manual**\n\nThis manual is currently being written by Radar. Check back soon!', 'info');
        break;
      case 'tip':
        handleTip();
        break;
      case 'option':
        if (args.length < 1) {
          addMessage('Please specify an option (a, b, or c)', 'error');
          return;
        }
        handleOption(args[0]);
        break;
      case 'status':
        addMessage(
          `**Current Status**\nShift Time: ${gameState.shiftTime}s\nLives Saved: ${gameState.savedLives}\nStatus: ${gameState.status}`,
          'info'
        );
        break;
      case 'help':
        addMessage(
          '**Available Commands:**\n\n' +
          '• start-shift - Start a new shift\n' +
          '• manual - Read the Medical Field Manual\n' +
          '• tip - Request a tip (10s delay)\n' +
          '• option [a/b/c] - Choose treatment option\n' +
          '• status - View current status\n' +
          '• help - Show this help message',
          'system'
        );
        break;
      default:
        addMessage(`Unknown command: ${command}`, 'error');
    }
  }, [gameState.isShiftActive, startShift, handleTip, handleOption, addMessage]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (inactivityTimerRef.current) clearInterval(inactivityTimerRef.current);
    };
  }, []);

  return {
    gameState,
    messages,
    processCommand,
  };
}
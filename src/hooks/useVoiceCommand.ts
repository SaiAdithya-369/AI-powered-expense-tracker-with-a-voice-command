import { useState, useCallback, useEffect } from 'react';

export const useVoiceCommand = (onCommand: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string>('');

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onCommand(text);
      };

      recognition.onerror = (event: any) => {
        setError('Error occurred in recognition: ' + event.error);
      };

      recognition.start();
    } else {
      setError('Speech recognition not supported in this browser.');
    }
  }, [onCommand]);

  return { isListening, error, startListening };
};
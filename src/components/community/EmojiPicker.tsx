import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import EmojiPickerLib, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerButtonProps {
  onSelect: (emoji: string) => void;
  ariaLabel?: string;
}

export const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ onSelect, ariaLabel }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label={ariaLabel || 'Choose emoji'}>
          <Smile className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[320px]" align="end">
        <EmojiPickerLib 
          onEmojiClick={(e: EmojiClickData) => onSelect(e.emoji)}
          searchDisabled
          skinTonesDisabled
          lazyLoadEmojis
          width="100%"
          height={380}
        />
      </PopoverContent>
    </Popover>
  );
};

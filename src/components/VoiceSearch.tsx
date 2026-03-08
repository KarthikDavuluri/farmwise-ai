import { useState, useCallback } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cropNames, cropPrices } from "@/data/cropData";
import { toast } from "@/hooks/use-toast";

interface VoiceSearchProps {
  onCropSelect: (crop: string) => void;
}

export function VoiceSearch({ onCropSelect }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not Supported", description: "Voice search is not supported in this browser. Try Chrome.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      setTranscript(spoken);

      // Try to match a crop name
      const matchedCrop = cropNames.find(c => spoken.includes(c.toLowerCase()));
      if (matchedCrop) {
        onCropSelect(matchedCrop);
        toast({ title: `Found: ${matchedCrop}`, description: `Showing prices for ${matchedCrop}` });
      } else {
        toast({ title: "Crop not found", description: `Heard: "${spoken}". Try saying a crop name like Rice, Tomato, Wheat.`, variant: "destructive" });
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      toast({ title: "Voice Error", description: event.error === "not-allowed" ? "Microphone access denied" : "Could not understand. Please try again.", variant: "destructive" });
    };

    recognition.start();
  }, [onCropSelect]);

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={startListening}
        disabled={isListening}
        variant={isListening ? "destructive" : "default"}
        size="lg"
        className="gap-2"
      >
        {isListening ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Listening...
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            Voice Search
          </>
        )}
      </Button>
      {transcript && (
        <span className="text-sm text-muted-foreground">
          Heard: "{transcript}"
        </span>
      )}
    </div>
  );
}

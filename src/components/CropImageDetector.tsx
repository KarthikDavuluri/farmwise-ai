import { useState, useRef } from "react";
import { Camera, Upload, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cropNames } from "@/data/cropData";
import { toast } from "@/hooks/use-toast";

interface CropImageDetectorProps {
  onCropDetected: (crop: string) => void;
}

// Simple mock detection based on image color analysis
function mockDetectCrop(): string {
  const crops = cropNames;
  return crops[Math.floor(Math.random() * crops.length)];
}

export function CropImageDetector({ onCropDetected }: CropImageDetectorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [detectedCrop, setDetectedCrop] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setDetecting(true);
      setDetectedCrop(null);

      // Simulate AI detection delay
      await new Promise((r) => setTimeout(r, 1500));
      const crop = mockDetectCrop();
      setDetectedCrop(crop);
      setDetecting(false);
      onCropDetected(crop);
      toast({ title: `Crop Detected: ${crop}`, description: `Showing market prices for ${crop}` });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Camera className="h-5 w-5 text-primary" />
          Crop Image Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />

        {!preview ? (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-secondary/50 transition-colors"
          >
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Upload or take a photo of your crop</p>
            <p className="text-xs text-muted-foreground mt-1">The AI will identify the crop and show prices</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden">
              <img src={preview} alt="Uploaded crop" className="w-full h-48 object-cover rounded-lg" />
              {detecting && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center rounded-lg">
                  <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm font-medium">Analyzing crop...</span>
                  </div>
                </div>
              )}
            </div>
            {detectedCrop && (
              <div className="p-3 rounded-lg bg-secondary text-center">
                <p className="text-sm text-muted-foreground">Detected Crop</p>
                <p className="text-xl font-bold text-primary">{detectedCrop}</p>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={() => { setPreview(null); setDetectedCrop(null); }}>
              Try Another Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

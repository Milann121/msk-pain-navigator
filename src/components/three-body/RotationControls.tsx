
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface RotationControlsProps {
  xRotation: number;
  yRotation: number;
  zoom: number;
  onXRotationChange: (value: number[]) => void;
  onYRotationChange: (value: number[]) => void;
  onZoomChange: (value: number[]) => void;
  onReset: () => void;
}

export function RotationControls({
  xRotation,
  yRotation,
  zoom,
  onXRotationChange,
  onYRotationChange,
  onZoomChange,
  onReset
}: RotationControlsProps) {
  return (
    <div className="space-y-6 p-6 bg-white/95 backdrop-blur-sm rounded-lg border shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Model Rotation</h3>
        <button 
          onClick={onReset}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          title="Reset to neutral position"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
      
      {/* Y-axis rotation (horizontal rotation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 font-medium">Horizontal Rotation</Label>
          <span className="text-xs text-gray-500 font-mono min-w-[3rem] text-right">{Math.round(yRotation)}°</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Slider
            value={[yRotation]}
            onValueChange={onYRotationChange}
            min={-360}
            max={360}
            step={0.5}
            className="flex-1 cursor-pointer transition-all duration-150 ease-out"
          />
          <RotateCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* X-axis rotation (vertical rotation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 font-medium">Vertical Rotation</Label>
          <span className="text-xs text-gray-500 font-mono min-w-[3rem] text-right">{Math.round(xRotation)}°</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Slider
            value={[xRotation]}
            onValueChange={onXRotationChange}
            min={-180}
            max={180}
            step={0.5}
            className="flex-1 cursor-pointer transition-all duration-150 ease-out"
          />
          <RotateCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Zoom control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 font-medium">Zoom</Label>
          <span className="text-xs text-gray-500 font-mono min-w-[3rem] text-right">{Math.round(zoom * 100)}%</span>
        </div>
        <div className="flex items-center gap-3">
          <ZoomOut className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Slider
            value={[zoom]}
            onValueChange={onZoomChange}
            min={0.5}
            max={10}
            step={0.05}
            className="flex-1 cursor-pointer transition-all duration-150 ease-out"
          />
          <ZoomIn className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

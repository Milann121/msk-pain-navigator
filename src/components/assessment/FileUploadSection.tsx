import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export const FileUploadSection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    const file = files[0];
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('assessment.fileUpload.errors.invalidFormat'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error(t('assessment.fileUpload.errors.fileTooLarge'));
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: storageData, error: storageError } = await supabase.storage
        .from('user-documents')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-documents')
        .getPublicUrl(fileName);

      // Save file metadata to database
      const { data: dbData, error: dbError } = await supabase
        .from('user_uploaded_files')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: publicUrl,
          storage_path: fileName
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Add to uploaded files list
      setUploadedFiles(prev => [...prev, {
        id: dbData.id,
        fileName: dbData.file_name,
        fileType: dbData.file_type,
        fileSize: dbData.file_size,
        uploadedAt: dbData.uploaded_at
      }]);

      toast.success(t('assessment.fileUpload.success.uploaded'));
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(t('assessment.fileUpload.errors.uploadFailed'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileRemove = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('user_uploaded_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      toast.success(t('assessment.fileUpload.success.removed'));
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error(t('assessment.fileUpload.errors.removeFailed'));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t('assessment.fileUpload.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        {/* Upload Documents Section - Left Half */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {t('assessment.fileUpload.dropzone.instruction')}
              </p>
              <p className="text-xs text-gray-500">
                {t('assessment.fileUpload.dropzone.supportedFormats')}
              </p>
            </div>
            <Button 
              onClick={handleFileSelect}
              disabled={uploading}
              className="mt-4"
            >
              {uploading ? t('assessment.fileUpload.uploading') : t('assessment.fileUpload.selectFiles')}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t('assessment.fileUpload.uploadedFiles')}:</h4>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{file.fileName}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.fileSize)} • {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFileRemove(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">{t('assessment.fileUpload.privacy.title')}</p>
              <p>{t('assessment.fileUpload.privacy.description')}</p>
            </div>
          </div>
        </div>

        {/* History Section - Right Half */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('assessment.fileUpload.history.title')}</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600">
                <span>{t('assessment.fileUpload.history.uploadDate')}</span>
                <span>{t('assessment.fileUpload.history.fileName')}</span>
                <span>{t('assessment.fileUpload.history.password')}</span>
              </div>
            </div>
            <div className="divide-y">
              {/* Example row - will be replaced with actual data */}
              <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                <span className="text-gray-500">2024-01-15</span>
                <span className="text-gray-700">medical_report.pdf</span>
                <Input type="password" placeholder={t('assessment.fileUpload.history.passwordPlaceholder')} className="h-8" />
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                <span className="text-gray-500">2024-01-10</span>
                <span className="text-gray-700">xray_image.jpg</span>
                <Input type="password" placeholder={t('assessment.fileUpload.history.passwordPlaceholder')} className="h-8" />
              </div>
              {/* Empty state when no history */}
              {uploadedFiles.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm">{t('assessment.fileUpload.history.noHistory')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
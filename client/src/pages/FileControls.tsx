import { useState, type ChangeEvent } from 'react';

export default function FileControls() {
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);

  const handleSingleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSingleFile(e.target.files[0]);
  };

  const handleMultipleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setMultipleFiles(Array.from(e.target.files));
  };

  return (
    <div data-testid="file-controls-page">
      <h1 className="page-title" data-testid="page-title">File Upload Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice file upload scenarios including single, multiple, drag & drop, and image preview.
      </p>

      <div className="grid-2">
        {/* Single File Upload */}
        <div className="card" data-testid="single-upload-card">
          <h3 className="card__title">Single File Upload</h3>
          <div className="form-group">
            <label htmlFor="single-file" data-testid="single-file-label">Choose File</label>
            <input
              id="single-file"
              type="file"
              className="form-control"
              onChange={handleSingleFile}
              aria-label="Choose File"
              data-testid="single-file-input"
              data-test="single-file-input"
              title="Choose File"
            />
            {singleFile && (
              <p className="help-text" data-testid="single-file-result">
                File: {singleFile.name} ({(singleFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
        </div>

        {/* Multiple File Upload */}
        <div className="card" data-testid="multiple-upload-card">
          <h3 className="card__title">Multiple File Upload</h3>
          <div className="form-group">
            <label htmlFor="multiple-files" data-testid="multiple-files-label">Choose Files</label>
            <input
              id="multiple-files"
              type="file"
              className="form-control"
              multiple
              onChange={handleMultipleFiles}
              aria-label="Choose Multiple Files"
              data-testid="multiple-files-input"
              data-test="multiple-files-input"
              title="Choose Multiple Files"
            />
            {multipleFiles.length > 0 && (
              <div data-testid="multiple-files-result">
                <p className="help-text">{multipleFiles.length} file(s) selected:</p>
                <ul style={{ paddingLeft: 20, listStyle: 'disc' }}>
                  {multipleFiles.map((f, i) => (
                    <li key={i} className="help-text" data-testid={`file-item-${i}`}>
                      {f.name} ({(f.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

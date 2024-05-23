import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validateFileInput = (file) => {
        const validFileTypes = ['text/csv', 'text/plain', 'application/octet-stream'];
        const validExtensions = ['csv', 'txt', 'fl2', 'FL2', 'patch'];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB

        const fileExtension = file.name.split('.').pop();
        const isValidExtension = validExtensions.includes(fileExtension);

        if (!isValidExtension) {
            return 'Invalid file type. Please upload a .csv, .txt, .fl2, .FL2, or .patch file.';
        }

        if (!validFileTypes.includes(file.type) && fileExtension !== 'fl2' && fileExtension !== 'FL2' && fileExtension !== 'patch') {
            return 'Invalid file type. Please upload a .csv, .txt, .fl2, .FL2, or .patch file.';
        }

        if (file.size > maxFileSize) {
            return 'File size exceeds the limit of 5MB.';
        }

        return '';
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const validationError = validateFileInput(selectedFile);

        if (validationError) {
            setErrorMessage(validationError);
            setFile(null);
        } else {
            setErrorMessage('');
            setFile(selectedFile);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            // Handle file upload logic here
            console.log('File ready for upload:', file);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.txt,.fl2,.FL2,.patch"
                    required
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit" disabled={!file}>Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;

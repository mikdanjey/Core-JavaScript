import React, { useState } from 'react';

const FileUpload = ({ allowMultiple }) => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validFileExtensions = ['csv', 'txt', 'fl2', 'FL2', 'patch'];

    const validateFileInput = (file) => {
        const fileExtension = file.name.split('.').pop();
        const isValidExtension = validFileExtensions.includes(fileExtension);

        if (!isValidExtension) {
            return `${file.name}: Invalid file type. Please upload a .csv, .txt, .fl2, .FL2, or .patch file.`;
        }

        return '';
    };

    const validateFileContent = (fileContent) => {
        const xssPattern = /<[^>]*script.*?>|<[^>]*iframe.*?>|<[^>]*object.*?>|<[^>]*embed.*?>|<[^>]*form.*?>|<[^>]*img.*?>|<[^>]*input.*?>|<[^>]*style.*?>|javascript:|data:/i;
        if (xssPattern.test(fileContent)) {
            return 'File contains potentially malicious content.';
        }
        return '';
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const validationError = validateFileInput(selectedFile);
        if (validationError) {
            setErrorMessage(validationError);
            setFile(null);
            return;
        }

        const fileContent = await selectedFile.text();
        const contentError = validateFileContent(fileContent);
        if (contentError) {
            setErrorMessage(`${selectedFile.name}: ${contentError}`);
            setFile(null);
            return;
        }

        setErrorMessage('');
        setFile(selectedFile);
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
                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                <button type="submit" disabled={!file}>Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;


import React, { useState } from 'react';

const FileUpload = ({ allowMultiple }) => {
    const [files, setFiles] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    const validateFileInput = (files) => {
        const validFileTypes = ['text/csv', 'text/plain', 'application/octet-stream'];
        const validExtensions = ['csv', 'txt', 'fl2', 'FL2', 'patch'];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB

        let errors = [];

        for (let file of files) {
            const fileExtension = file.name.split('.').pop();
            const isValidExtension = validExtensions.includes(fileExtension);

            if (!isValidExtension) {
                errors.push(`${file.name}: Invalid file type. Please upload a .csv, .txt, .fl2, .FL2, or .patch file.`);
            } else if (!validFileTypes.includes(file.type) && fileExtension !== 'fl2' && fileExtension !== 'FL2' && fileExtension !== 'patch') {
                errors.push(`${file.name}: Invalid file type. Please upload a .csv, .txt, .fl2, .FL2, or .patch file.`);
            } else if (file.size > maxFileSize) {
                errors.push(`${file.name}: File size exceeds the limit of 5MB.`);
            }
        }

        return errors;
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validationErrors = validateFileInput(selectedFiles);

        if (validationErrors.length > 0) {
            setErrorMessages(validationErrors);
            setFiles([]);
        } else {
            setErrorMessages([]);
            setFiles(selectedFiles);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (files.length > 0) {
            // Handle file upload logic here
            console.log('Files ready for upload:', files);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.txt,.fl2,.FL2,.patch"
                    multiple={allowMultiple}
                    required
                />
                {errorMessages.length > 0 && (
                    <ul style={{ color: 'red' }}>
                        {errorMessages.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
                <button type="submit" disabled={files.length === 0}>Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;

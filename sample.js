
content = content.replace(/\\/g, '') // Remove all backslashes
                .replace(/"/g, '') // Remove all double quotes
                .replace(/>"/g, '>'); // Remove all >" sequences

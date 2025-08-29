// 1. Helper to infer MIME type from a file URL or env var
export function getMimeType(srcUrl) {
  if(!srcUrl) return null;
    const ext = srcUrl.split('.').pop().toLowerCase();
    switch (ext) {
      case 'svg':
        return 'image/svg+xml';
      case 'webp':
        return 'image/webp';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      default:
        return 'application/octet-stream';
    }
  }

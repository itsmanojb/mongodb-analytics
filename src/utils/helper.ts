export function formatSize(size: number): string {
  if (size < 1024) {
    return size + " B";
  } else if (size < 1024 * 1024) {
    const sizeInKB = (size / 1024).toFixed(2);
    return removeTrailingZeros(sizeInKB) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    const sizeInMB = (size / (1024 * 1024)).toFixed(2);
    return removeTrailingZeros(sizeInMB) + " MB";
  } else {
    const sizeInGB = (size / (1024 * 1024 * 1024)).toFixed(2);
    return removeTrailingZeros(sizeInGB) + " GB";
  }
}

function removeTrailingZeros(value: string): string {
  return value.replace(/\.?0+$/, "");
}

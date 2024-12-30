import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getInitials = function (string: string) {
  var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const createFormData = (body: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
  });
  return formData;
}

export function checkIfFilesAreTooBig(files?: File[] | null): boolean {
  if (!files) return true;

  for (const file of files) {
    if (file.size / 1024 / 1024 > 2) {
      return false;
    }
  }

  return true;
}

export function checkIfFilesAreCorrectType(files?: File[] | null): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export const downloadFile = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const fileName = getFileNameFromUrl(fileUrl);
  const downloadUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(downloadUrl);
  document.body.removeChild(link);
};

const getFileNameFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1] || '';
};

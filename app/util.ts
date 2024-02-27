
export function timeAgo(dt: Date): string {
  const now = new Date();
  const diff = now.getTime() - dt.getTime(); // Get the difference in milliseconds

  // Convert to seconds
  const diffSeconds = Math.floor(diff / 1000);

  // Calculate minutes, hours, and days
  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the appropriate message
  if (days > 0) {
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  } else {
    return 'agora mesmo';
  }
}

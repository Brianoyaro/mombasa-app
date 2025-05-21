import { useEffect, useState } from 'react';

export default function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const isDarkNow = !isDark;
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
    setIsDark(isDarkNow);
  };

  return { isDark, toggleTheme };
}

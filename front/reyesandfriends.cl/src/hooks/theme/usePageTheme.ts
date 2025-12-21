import { useEffect, useState } from 'react';

const STORAGE_KEY = 'page_theme';
const DEFAULT_THEME = 'reyes';

// Get appropriate topic based on the current date
const getCurrentSeasonTheme = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() 0-11
  const day = now.getDate();

  // 5 oct to 5 nov: reyes-halloween
  if ((month === 10 && day >= 5) || (month === 11 && day <= 5)) {
    return 'reyes-halloween';
  }
  
  // 1 dec to 1 jan: reyes-christmas
  if ((month === 12 && day >= 1) || (month === 1 && day <= 1)) {
    return 'reyes-christmas';
  }

  return DEFAULT_THEME;
};

// Get valid themes based on the current season
const getValidThemes = (): string[] => {
  const currentSeasonTheme = getCurrentSeasonTheme();
  
  if (currentSeasonTheme === 'reyes-halloween') {
    return ['reyes', 'reyes-halloween'];
  } else if (currentSeasonTheme === 'reyes-christmas') {
    return ['reyes', 'reyes-christmas'];
  }
  
  return ['reyes']; // Only reyes outside special seasons
};

export const usePageTheme = () => {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const validThemes = getValidThemes();
    const currentSeasonTheme = getCurrentSeasonTheme();
    
    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme);
      setLoading(false);
    } else {
      // If no saved theme or it's invalid for the current season, use the seasonal theme
      const themeToSet = savedTheme === 'reyes' ? 'reyes' : currentSeasonTheme;
      setTheme(themeToSet);
      localStorage.setItem(STORAGE_KEY, themeToSet);

      if (savedTheme && !validThemes.includes(savedTheme)) {
        window.location.reload();
        return;
      }
      setLoading(false);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Si loading aún no es false, lo ponemos en false después de aplicar el tema
    if (loading) setLoading(false);
  }, [theme]);

  const updateTheme = (newTheme: string) => {
    const validThemes = getValidThemes();
    
    if (validThemes.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    } else {
      const currentSeasonTheme = getCurrentSeasonTheme();
      localStorage.setItem(STORAGE_KEY, currentSeasonTheme);
      window.location.reload();
    }
  };

  return {
    theme,
    setTheme: updateTheme,
    currentSeasonTheme: getCurrentSeasonTheme(),
    validThemes: getValidThemes(),
    loading,
  };
};

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTINE } from './data';

const STORAGE_KEY = 'exercise_progress_v1';

// completions by date "YYYY-MM-DD" -> { exerciseId: seriesCompleted }
let seriesProgress: Record<string, Record<string, number>> = {};
let listeners: Array<(state: Record<string, Record<string, number>>) => void> = [];

const notifyListeners = () => {
  listeners.forEach(l => l({ ...seriesProgress }));
};

const saveProgress = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seriesProgress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

const loadProgress = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      seriesProgress = JSON.parse(jsonValue);
      notifyListeners();
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
};

// Initialize progress on load
loadProgress();

export const useStore = () => {
  const [state, setState] = useState(seriesProgress);

  useEffect(() => {
    const listener = (newState: Record<string, Record<string, number>>) => setState(newState);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const completeSeries = (id: string, dateStr: string = new Date().toISOString().split('T')[0]) => {
    if (!seriesProgress[dateStr]) {
      seriesProgress[dateStr] = {};
    }
    seriesProgress[dateStr][id] = (seriesProgress[dateStr][id] || 0) + 1;
    saveProgress();
    notifyListeners();
  };

  const getSeriesCompleted = (id: string, dateStr: string = new Date().toISOString().split('T')[0]) => {
    return (seriesProgress[dateStr] || {})[id] || 0;
  };

  const isCompleted = (id: string, totalSeries: number, dateStr: string = new Date().toISOString().split('T')[0]) => {
    return getSeriesCompleted(id, dateStr) >= totalSeries;
  };

  const getProgress = (exerciseIdsWithTotal: {id: string, total: number}[], dateStr: string = new Date().toISOString().split('T')[0]) => {
    if (exerciseIdsWithTotal.length === 0) return 0;
    const dayProgress = seriesProgress[dateStr] || {};
    
    let totalNeeded = 0;
    let totalDone = 0;
    
    exerciseIdsWithTotal.forEach(({id, total}) => {
      totalNeeded += total;
      totalDone += Math.min(dayProgress[id] || 0, total);
    });

    return totalDone / totalNeeded;
  };

  const getMonthlyProgress = (exerciseIdsWithTotal: {id: string, total: number}[], month: number, year: number) => {
    let totalDone = 0;

    // Sum all series done in the specified month
    Object.keys(seriesProgress).forEach(date => {
      const [y, m, d] = date.split('-').map(Number);
      if (m === month + 1 && y === year) {
        const dayProgress = seriesProgress[date];
        Object.values(dayProgress).forEach(count => {
          totalDone += count;
        });
      }
    });

    // Calculate total scheduled series for the month
    let totalScheduled = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dayOfWeek = d.getDay(); // 0 is Sunday
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Map Sunday (0) to 6, Monday (1) to 0...
      
      const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      const routine = ROUTINE.find(r => r.day === dayNames[dayIndex]);
      
      if (routine) {
        routine.exercises.forEach(ex => {
          totalScheduled += ex.series;
        });
      }
    }

    if (totalScheduled === 0) return 0;
    return Math.min(totalDone / totalScheduled, 1);
  };

  return { seriesProgress: state, completeSeries, getSeriesCompleted, isCompleted, getProgress, getMonthlyProgress };
};
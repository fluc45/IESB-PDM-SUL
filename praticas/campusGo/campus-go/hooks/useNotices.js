import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.list('posts?_limit=10');
      setNotices(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { notices, isLoading, error, reload: load };
}

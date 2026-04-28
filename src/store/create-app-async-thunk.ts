import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkApiConfig } from './types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

#!/usr/bin/env node

import server from './server';
import fs from 'fs';
import path from 'path';
import mongoose  from 'mongoose';
import { development as config } from '../config';
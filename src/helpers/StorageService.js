import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

class StorageService {
    // REGEX 
    // Common Patterns
    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    };

    static validate(type, value) {
        return this.patterns[type] ? this.patterns[type].test(value) : false;
    }

    // ASYNC STORAGE - Data no sensible
    static async setItem(key, value) {
        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
            await AsyncStorage.setItem(key, stringValue);
        } catch (error) {
            console.error('Error guardando en AsyncStorage:', error);
        }
    }

    static async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) return null;
            
            // PARSEAR
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            console.error('Error leyendo en AsyncStorage:', error);
            return null;
        }
    }

    // Secure Store - Sensitive
    static async saveToken(key, token) {
        try {
            // SecureStore solo acepta Strings
            await SecureStore.setItemAsync(key, String(token));
        } catch (error) {
            console.error('Error guardando en Secure Storage:', error);
        }
    }

    static async getToken(key) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error('No se pudieron recuperar las credenciales:', error);
            return null;
        }
    }

    static async resetToken(key) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error borrando en Secure Storage:', error);
        }
    }
}

export default StorageService;
import { Alert } from 'react-native';
import StorageService from '../helpers/StorageService';

export const validateRegisterForm = (data) => {
    const { name, lastName, age, income, email, password, confirmPassword } = data;

    if (!name?.trim() || !lastName?.trim() || !age?.trim() || !income?.trim() || !email?.trim()) {
        Alert.alert('Error', 'All fields are required');
        return false;
    }

    if (name.trim().length < 2 || lastName.trim().length < 2) {
        Alert.alert('Error', 'The first and last names must be at least 2 characters long.');
        return false;
    }

    if (!StorageService.validate('email', email)) {
        Alert.alert('Error', 'Invalid email address');
        return false;
    }

    if (!StorageService.validate('password', password)) {
        Alert.alert('Error', 'Invalid password (minimum 8 characters, one uppercase letter, and one number)');
        return false;
    }

    if (password !== confirmPassword) {
        Alert.alert('Error', 'The passwords do not match.');
        return false;
    }

    const edadNum = parseInt(age);
    if (isNaN(edadNum) || edadNum < 18 || edadNum > 100) {
        Alert.alert('Error', 'You must be at least 18 years old to adopt.');
        return false;
    }

    const ingresosNum = parseFloat(income);
    if (isNaN(ingresosNum) || ingresosNum <= 0) {
        Alert.alert('Error', 'Please enter a valid income amount.');
        return false;
    }

    return true;
};
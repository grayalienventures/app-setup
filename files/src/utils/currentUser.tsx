import { useSelector } from 'react-redux'
import { UserT } from '../types/Users';

export const getCurrentUser = (): UserT | null => {
    let auth = useSelector(state => state.auth)
    return auth.user && auth.user
}


export const getCurrentUserRoles = (): Array<string> => {
    const currentUser = getCurrentUser()
    const roles = currentUser && currentUser.roles ? currentUser.roles : []
    return roles
}

export const getCurrentUserId = (): number | null => {
    const currentUser = getCurrentUser()
    return currentUser && currentUser.id
}


export const currentUserIsManager = (): Boolean => {
    const roles = getCurrentUserRoles()
    return roles.includes('administrator') || roles.includes('manager')
}


export const currentUserIsClient = (): Boolean => {
    const roles = getCurrentUserRoles()
    return roles.includes('client')
}

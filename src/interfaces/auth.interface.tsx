/**
 *  auth.interface.tsx
 *
 *  user inteface
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
export interface LoginFormInterface {
    id?: string,
    /** user key */
    key?: string,
    /** email */
    username?: string;
    password?: string;
    /** authtication token */
    token?: string;
}
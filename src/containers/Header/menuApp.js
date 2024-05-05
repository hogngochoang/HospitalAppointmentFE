export const adminMenu = [
    
    { //quản lý người dùng
        name: 'menu.admin.manage-users', menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/manage-user'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/system/manage-schedule'
            },
        ]
    },
    { //quản lý tin tức
        name: 'menu.admin.statistic', menus: [
            {
                name: 'menu.admin.manage-statistic', link: '/system/manage-statistic'
            },
        ]
    },

];

export const doctorMenu = [
    
    { //quản lý kế hoạch khám
        name: 'menu.doctor.schedule', menus:[
            {
                name: 'menu.doctor.manage-schedule',link: '/doctor/manage-schedule'
            }
        ] 
    },
    { //quản lý danh sách khám
        name: 'menu.doctor.manage-patient', menus: [
            {
                name:'menu.doctor.waiting-patient',link: '/doctor/manage-patient'
            },
            {
                name:'menu.doctor.examined-patient',link: '/doctor/examined-patient'
            }
        ]
    },

];

export const staffMenu = [
    

    { //quản lý danh sách khám
        name: 'menu.staff.manage-patient', menus: [
            {
                name:'menu.staff.waiting-patient',link: '/staff/waiting-patient'
            },
            {
                name:'menu.staff.confirmed-patient',link: '/staff/confirmed-patient'
            }
        ]
    },

];
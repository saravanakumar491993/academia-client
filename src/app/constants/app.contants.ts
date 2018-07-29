import { ApplicationModule, ApplicationModuleOption } from "../model/application-module";

export class AppConstant {
    public static SnackBarDismissalTime: number = 3000;

    public static AppModules: ApplicationModule[] = [
        {
            name: "Student",
            options: [
                { 
                    name: "Add Student",
                    location: "/students/new"
                },
                { 
                    name: "List Student",
                    location: "/students"
                }                
            ]
        },
        {
            name: "Course",
            options: [
                { 
                    name: "Add Course",
                    location: "/courses/new"
                },
                { 
                    name: "List Course",
                    location: "/courses"
                }                
            ]
        },
    ]
}
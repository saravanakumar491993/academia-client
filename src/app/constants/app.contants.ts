import { ApplicationModule, ApplicationModuleOption } from "../model/application-module";

export class AppConstant {
    public static SnackBarDismissalTime: number = 3000;

    public static AppModules: ApplicationModule[] = [
        {
            name: "Student",
            options: [
                { 
                    name: "Add Student",
                    location: "/courses/new"
                },
                { 
                    name: "List Student",
                    location: "/courses/new"
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
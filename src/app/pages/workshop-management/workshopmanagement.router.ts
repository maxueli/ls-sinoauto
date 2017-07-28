import { WorkshopManagementComponent } from './workshop-management.component';
import { MaintenanceWorkerComponent } from './maintenance-worker/maintenance-worker.component';
import { MaintenanceAcceptanceComponent } from './maintenance-acceptance/maintenance-acceptance.component';
export const workshopRoute = [
    {
        path: '',
        component: WorkshopManagementComponent,
        children: [
            {
                path: 'maintenancework',//维修派工
                component: MaintenanceWorkerComponent
            }, {
                path: 'maintenanceaccept',//维修验收
                component: MaintenanceAcceptanceComponent
            }, {
                path: '',
                redirectTo: 'maintenancework',
                pathMatch: 'full'
            }
        ]
    }
]
export const workshopCompon = [WorkshopManagementComponent, MaintenanceWorkerComponent, MaintenanceAcceptanceComponent]
import { ToolsComponent } from './tools.component';
import { WarehouseDefinitionComponent } from './warehouse-definition//warehouse-definition.component';
export const toolsRouter = [
    {
        path: '',
        component: ToolsComponent,
        children: [
            {
                path: 'warehouse',//仓库定义
                component: WarehouseDefinitionComponent
            }
        ]
    }
]
export const toolsCom = [ToolsComponent, WarehouseDefinitionComponent]
import { ApiResponse } from './../src/app/core/services/api/api-service';
import { MockRequest } from '@delon/mock';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

function getTestList() {
    return [
        {
            success: 1,
            data: [
                {
                    user: '001',
                    name: 'name_001'
                },
                {
                    user: '002',
                    name: 'name_002'
                },
                {
                    user: '002',
                    name: 'name_002'
                },
                {
                    user: '002',
                    name: 'name_002'
                }
            ],
            validation: [],
            error: [],
            status: 200
        }
    ]
}

function postTest() {
    const s =
    {
        success: 2,
        data: [
            {
                user: '001',
                name: 'name_001'
            }
        ],
        validation: [
            {
                message: 'system.validation.message',
                code: 'system.validation.message',
                data: {
                    user: '002',
                    name: 'name_002'
                }
            },
            {
                message: 'system.validation.message',
                code: 'system.validation.message',
                data: {
                    user: '003',
                    name: 'name_003'
                }
            }
        ],
        error: [
            {
                message: 'system.error.message',
                code: 'system.error.message',
                data: {
                    user: '004',
                    name: 'name_004'
                }
            },
            {
                message: 'system.error.message',
                code: 'system.error.message',
                data: {
                    user: '005',
                    name: 'name_005'
                }
            }
        ],
        status: 200
    }
    return s;

}

export const TEST = {
    'GET /mock/test/list': (req: ApiResponse) => getTestList(),
    'POST /mock/test/post': (req: ApiResponse) => postTest(),
    'PUT /mock/test/put': (req: ApiResponse) => postTest()
}
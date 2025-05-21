export default {}

export const LOGATE_ADDRESS_API_KEY = 'WD36-CF29-CU97-HX98'
export const ADDRESS_API_KEY = 'V1eP5vTCJEWf-_0jm8sUvA41132'
export const API_IMAGE_UPLOAD_ENDPOINT = '/v1/shoppify/public/image_upload'

export const INSIDE_LEFT_DEFAULT_TEMPLATE = 1
export const INSIDE_RIGHT_DEFAULT_TEMPLATE = 0

export const TEMPLATES = [
    {
        template_id: 0,
        template_name: 'single-sections',
        sections: [
            {
                id: 0,
                top: '5%',
                left: '5%',
                width: '90%',
                height: '90%'
            }
        ]
    },
    {
        template_id: 1,
        template_name: 'double-sections',
        sections: [
            {
                id: 0,
                top: '5%',
                left: '5%',
                width: '90%',
                height: '43%'
            },
            {
                id: 1,
                top: '52%',
                left: '5%',
                width: '90%',
                height: '43%'
            }
        ]
    },
    {
        template_id: 2,
        template_name: 'triple-sections',
        sections: [
            {
                id: 0,
                top: '5%',
                left: '5%',
                width: '90%',
                height: '24%'
            },
            {
                id: 1,
                top: '32%',
                left: '5%',
                width: '90%',
                height: '35%'
            },
            {
                id: 2,
                top: '70%',
                left: '5%',
                width: '90%',
                height: '25%'
            }
        ]
    },
    {
        template_id: 3,
        template_name: 'quadruple-sections',
        sections: [
            {
                id: 0,
                top: '5%',
                left: '5%',
                width: '90%',
                height: '24%'
            },
            {
                id: 1,
                top: '32%',
                left: '5%',
                width: '43%',
                height: '35%'
            },
            {
                id: 2,
                top: '32%',
                left: '52%',
                width: '43%',
                height: '35%'
            },
            {
                id: 3,
                top: '70%',
                left: '5%',
                width: '90%',
                height: '25%'
            }
        ]
    }
]

export const TEXT_SECTION = {
    type: 'text',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    defaultText: 'Write your message here..'
}

export const IMAGE_SECTION = {
    type: 'image',
    justifyContent: 'center',
    alignItems: 'center',
    rotationAngle: 0,
    posX: 0,
    posY: 0,
    imageWidth: 0,
    imageHeight: 0
}

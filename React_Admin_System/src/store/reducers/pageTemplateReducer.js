import {
    ADD_TEMPLATE_TO_PAGE,
    REMOVE_TEMPLATE_FROM_PAGE,
    ADD_CONTENT_TYPE_TO_SECTION,
    REMOVE_CONTENT_TYPE_FROM_SECTION,
    ADD_ACTIVE_SECTION,
    REMOVE_ACTIVE_SECTION,
    ADD_STYLES_TO_CURRENT_SELECTION,
    ADD_IMAGE_TO_SECTION,
    ZOOM_IN,
    ZOOM_OUT,
    ROTATE_COUNTERCLOCKWISE,
    ROTATE_CLOCKWISE,
    SET_IMAGE_POSITION,
    SET_IMAGE_SIZE,
    SET_CANVAS_SIZE,
    EDIT_TEXT,
    FILL_PREVIEW
} from '../actions/actionTypes'
import { TEMPLATES, TEXT_SECTION, IMAGE_SECTION } from '../../config'
import { cloneDeep } from 'lodash'

const initialState = {}

const pageTemplateReducer = (state = initialState, action) => {
    let newPageTemplates = {}

    switch (action.type) {
        case ADD_TEMPLATE_TO_PAGE:
            newPageTemplates = {
                ...state
            }

            if (!action.payload.changeTemplate && typeof state[action.payload.activePage] !== 'undefined') {
                console.log('already has template')
            } else {
                newPageTemplates[action.payload.activePage] = cloneDeep(TEMPLATES[action.payload.templateId])
            }

            return {
                ...newPageTemplates
            }
        case REMOVE_TEMPLATE_FROM_PAGE:
            newPageTemplates = {
                ...state
            }
            delete newPageTemplates[action.payload.activePage]

            return {
                ...newPageTemplates
            }
        case ADD_CONTENT_TYPE_TO_SECTION:
            newPageTemplates = {
                ...state
            }
            //remove active state from selections
            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    delete newPageTemplates[pageKey].sections[sectionKey].active
                }
            }

            if (action.payload.sectionType === 'image') {
                newPageTemplates[action.payload.activePage].sections[action.payload.sectionId] = {
                    ...state[action.payload.activePage].sections[action.payload.sectionId],
                    active: true,
                    ...IMAGE_SECTION
                }
            } else {
                newPageTemplates[action.payload.activePage].sections[action.payload.sectionId] = {
                    ...state[action.payload.activePage].sections[action.payload.sectionId],
                    active: true,
                    fontFamily: action.payload.fontFamily,
                    fontPath: action.payload.fontPath,
                    fontPathLocal: action.payload.fontPathLocal,
                    ...TEXT_SECTION
                }
            }

            return {
                ...newPageTemplates
            }
        case REMOVE_CONTENT_TYPE_FROM_SECTION:
            newPageTemplates = {
                ...state
            }

            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId] = cloneDeep(TEMPLATES[newPageTemplates[action.payload.activePage].template_id].sections[action.payload.sectionId])

            return {
                ...newPageTemplates
            }

        case ADD_ACTIVE_SECTION:
            newPageTemplates = {
                ...state
            }
            //remove active state from selections
            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    delete newPageTemplates[pageKey].sections[sectionKey].active
                }
            }

            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].active = true

            return {
                ...newPageTemplates
            }
        case REMOVE_ACTIVE_SECTION:
            newPageTemplates = {
                ...state
            }
            //remove active state from selections
            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    delete newPageTemplates[pageKey].sections[sectionKey].active
                }
            }

            return {
                ...newPageTemplates
            }
        case ADD_STYLES_TO_CURRENT_SELECTION:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey] = { ...newPageTemplates[pageKey].sections[sectionKey], ...action.payload }
                    }
                }
            }

            return {
                ...newPageTemplates
            }
        case ADD_IMAGE_TO_SECTION:
            newPageTemplates = {
                ...state
            }

            newPageTemplates[action.payload.pageIndex].sections[action.payload.sectionIndex].image = action.payload.image
            newPageTemplates[action.payload.pageIndex].sections[action.payload.sectionIndex].orgImageWidth = action.payload.width
            newPageTemplates[action.payload.pageIndex].sections[action.payload.sectionIndex].orgImageHeight = action.payload.height
            newPageTemplates[action.payload.pageIndex].sections[action.payload.sectionIndex].imageWidth = action.payload.width
            newPageTemplates[action.payload.pageIndex].sections[action.payload.sectionIndex].imageHeight = action.payload.height

            return {
                ...newPageTemplates
            }

        case ZOOM_IN:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey].imageWidth = newPageTemplates[pageKey].sections[sectionKey].imageWidth + (newPageTemplates[pageKey].sections[sectionKey].imageWidth * 5) / 100
                        newPageTemplates[pageKey].sections[sectionKey].imageHeight = newPageTemplates[pageKey].sections[sectionKey].imageHeight + (newPageTemplates[pageKey].sections[sectionKey].imageHeight * 5) / 100
                    }
                }
            }

            return {
                ...newPageTemplates
            }
        case ZOOM_OUT:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey].imageWidth = newPageTemplates[pageKey].sections[sectionKey].imageWidth - (newPageTemplates[pageKey].sections[sectionKey].imageWidth * 5) / 100
                        newPageTemplates[pageKey].sections[sectionKey].imageHeight = newPageTemplates[pageKey].sections[sectionKey].imageHeight - (newPageTemplates[pageKey].sections[sectionKey].imageHeight * 5) / 100
                    }
                }
            }

            return {
                ...newPageTemplates
            }

        case ROTATE_COUNTERCLOCKWISE:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey].rotationAngle = newPageTemplates[pageKey].sections[sectionKey].rotationAngle - 10
                    }
                }
            }

            return {
                ...newPageTemplates
            }
        case ROTATE_CLOCKWISE:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey].rotationAngle = newPageTemplates[pageKey].sections[sectionKey].rotationAngle + 10
                    }
                }
            }

            return {
                ...newPageTemplates
            }
        case SET_IMAGE_POSITION:
            newPageTemplates = {
                ...state
            }

            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].posX = action.payload.posX
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].posY = action.payload.posY
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].imageWidth = action.payload.imageWidth
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].imageHeight = action.payload.imageHeight
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].rotationAngle = action.payload.rotationAngle

            return {
                ...newPageTemplates
            }
        case SET_IMAGE_SIZE:
            newPageTemplates = {
                ...state
            }

            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].imageWidth = action.payload.width
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].imageHeight = action.payload.height
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].posX = newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].canvas_width / 2 - action.payload.width / 2
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].posY = newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].canvas_height / 2 - action.payload.height / 2

            return {
                ...newPageTemplates
            }

        case SET_CANVAS_SIZE:
            newPageTemplates = {
                ...state
            }

            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].canvas_width = action.payload.canvas_width
            newPageTemplates[action.payload.activePage].sections[action.payload.sectionId].canvas_height = action.payload.canvas_height

            return {
                ...newPageTemplates
            }

        case EDIT_TEXT:
            newPageTemplates = {
                ...state
            }

            for (const [pageKey] of Object.entries(newPageTemplates)) {
                for (const [sectionKey] of Object.entries(newPageTemplates[pageKey].sections)) {
                    if (newPageTemplates[pageKey].sections[sectionKey].active) {
                        newPageTemplates[pageKey].sections[sectionKey].userText = action.payload.userText
                    }
                }
            }

            return {
                ...newPageTemplates
            }

        case FILL_PREVIEW:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default pageTemplateReducer

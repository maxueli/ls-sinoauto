import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
var time = '300ms';
var styles = {
    ease: time + 'ease',
    liner: time + 'liner',
    easeOut: time + 'ease-out',
    easeIn: time + 'ease-in',
    stepStart: time + 'step-start',
    stepEnd: time + ' step-end',
    easeInOut: time + ' ease-in-out',
    faseOutSlowIn: time + ' cubic-bezier(0.4, 0, 0.2, 1)',
    inOutBack: time + ' cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    inOutCubic: time + ' cubic-bezier(0.65, 0.05, 0.36, 1)',
    inOutQuadratic: time + ' cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    inOutSine: time + ' cubic-bezier(0.45, 0.05, 0.55, 0.95)'
}
var opt = {
    fadeIn: [
        style({ opacity: 0 }),
        animate(styles.inOutBack, style({ opacity: 1 }))
    ],
    fadeOut: [
        style({ opacity: 1 }),
        animate(styles.inOutBack, style({ opacity: 0 }))
    ],
    shrink: [
        style({ height: '*' }),
        animate(styles.inOutBack, style({ height: 0 }))
    ],
    stretch: [
        style({ height: '0' }),
        animate(styles.inOutBack, style({ height: '*' }))
    ],
    flyIn: [
        style({ transform: 'translateX(-100%)' }),
        animate(styles.inOutBack, style({ transform: '*' }))
    ],
    flyOut: [
        style({ transform: '*' }),
        animate(styles.inOutBack, style({ transform: 'translateX(-100%)' }))
    ],
    zoomIn: [
        style({ transform: 'scale(.5)' }),
        animate(styles.inOutBack, style({ transform: '*' }))
    ],
    zoomOut: [
        style({ transform: '*' }),
        animate(styles.inOutBack, style({ transform: 'scale(.5)' }))
    ]

}
export const fadeIn = [
    trigger('fadeIn', [transition('void=>*', opt.fadeIn)])//淡入
]
export const fadeOut = [
    trigger('fadeOut', [transition('* => void', opt.fadeOut)])//淡出
]
export const stretch = [
    trigger('stretch', [transition('void => *', opt.stretch)])//试试
]
export const shrink = [
    trigger('shrink', [transition('* => void', opt.shrink)])//不知道等会试试
]
export const flyIn = [
    trigger('flyIn', [transition('void => *', opt.flyIn)])//淡入
]
export const flyOut = [
    trigger('flyOut', [transition('* => void', opt.flyOut)])//淡出
]
export const zoomIn = [trigger('zoomIn', [transition('void => *', opt.zoomIn)])]
export const zoomOut = [trigger('zoomOut', [transition('* => void', opt.zoomOut)])]
export const simAnim = [
    trigger('simAnim', [
        transition('* => fadeIn', opt.fadeIn),
        transition('* => fadeOut', opt.fadeOut),
        transition('* => shrink', opt.shrink),
        transition('* => stretch', opt.stretch),
        transition('* => flyIn', opt.flyIn),
        transition('* => flyOut', opt.flyOut),
        transition('* => zoomIn', opt.zoomIn),
        transition('* => zoomOut', opt.zoomOut)
    ])
]


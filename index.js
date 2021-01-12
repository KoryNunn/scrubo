var m = require('mithril');

var state = {
    mcPherson: false,
    armLength: 300,
    shockToPivotLength: 200,
    topOfTyreToScrub: 100,
    damperTravel: 100,
    desiredTyreToScrubGap: 10
}

function maths() {
    var geometryRatio = state.mcPherson ? 1 : (1 / state.armLength * state.shockToPivotLength);
    var travel = state.damperTravel / geometryRatio;
    return ((state.topOfTyreToScrub + state.desiredTyreToScrubGap) - travel) * geometryRatio;
}

function field() {
    return {
        view: ({ attrs, children }) => {
            var { label, ...fieldAttrs } = attrs;

            return m('field', { ...fieldAttrs },
                m('label', label),
                children
            )
        }
    }
}

function textField() {
    return {
        view: ({ attrs }) => {
            var { property, label, placeholder, ...fieldAttrs } = attrs;

            return m(field, { ...fieldAttrs, label },
                m('input', {
                    placeholder,
                    value: state[property],
                    oninput: (event) => {
                        state[property] = parseInt(event.target.value);
                        rerender();
                    }
                })
            )
        }
    }
}

function checkField() {
    return {
        view: ({ attrs }) => {
            var { property, label, placeholder, ...fieldAttrs } = attrs;

            return m(field, { ...fieldAttrs, label },
                m('input', {
                    type: 'checkbox',
                    checked: state[property],
                    oninput: (event) => {
                        state[property] = event.target.checked;
                        rerender();
                    }
                })
            )
        }
    }
}

function rerender(){
    m.render(window.document.body,
        m('div',
            m('h1', 'Coilover lower mount adjustment calculator'),
            m('p', 'Jack the car up, let the wheels hang at full extension.'),
            m(checkField, {
                label: 'Is it a McPherson strut?',
                property: 'mcPherson'
            }),
            m(textField, {
                style: {
                    display: state.mcPherson ? 'none' : ''
                },
                label: 'A: Length of the suspension arm from chassis pivot to hub pivot.',
                placeholder: 'mm',
                property: 'armLength'
            }),
            m(textField, {
                style: {
                    display: state.mcPherson ? 'none' : ''
                },
                label: 'B: Distance from chassis pivot to strut attachment pivot.',
                placeholder: 'mm',
                property: 'shockToPivotLength'
            }),
            m(textField, {
                label: 'C: Distance from the top of the tyre to where it would scrub',
                placeholder: 'mm',
                property: 'topOfTyreToScrub'
            }),
            m(textField, {
                label: 'X: How much travel the damper has',
                placeholder: 'mm',
                property: 'damperTravel'
            }),
            m(textField, {
                label: 'How much of a gap you want to leave between tyre and chassis when you hit the bumpstop',
                placeholder: 'mm',
                property: 'desiredTyreToScrubGap'
            }),
            m('div',
                `Move the lower mount (Adjust bump height) ${Math.sign(maths()) < 0 ? 'down' : 'up'} by ${Math.round(Math.abs(maths()))}mm`
            ),
            m('img', { src: state.mcPherson ? 'Untitled2.png' : 'Untitled.png' })
        )
    )
}

window.addEventListener('DOMContentLoaded', () => {

    rerender();
})
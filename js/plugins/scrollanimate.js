const rematrix = (()=>{
    let fn = {};
    fn.format = (source) => {
        if (source && source.constructor === Array) {
            let values = source
            .filter((value) => typeof value === 'number')
            .filter((value) => !isNaN(value))

            if (source.length === 6 && values.length === 6) {
                let matrix = fn.identity()
                matrix[0] = values[0]
                matrix[1] = values[1]
                matrix[4] = values[2]
                matrix[5] = values[3]
                matrix[12] = values[4]
                matrix[13] = values[5]
                return matrix
            } else if (source.length === 16 && values.length === 16) {
                return source
            }
        }
        throw new TypeError('Expected a `number[]` with length 6 or 16.')
    }
    fn.identity = () => {
        let matrix = []
        for (let i = 0; i < 16; i++) {
            i % 5 == 0 ? matrix.push(1) : matrix.push(0)
        }
        return matrix
    }
    fn.fromString = (source) => {
        if (typeof source === 'string') {
            let match = source.match(/matrix(3d)?\(([^)]+)\)/)
            if (match) {
                let raw = match[2].split(',').map(parseFloat)
                return fn.format(raw)
            }
            if (source === 'none' || source === '') {
                return fn.identity()
            }
        }
        throw new TypeError('Expected a string containing `matrix()` or `matrix3d()')
    }
    fn.multiply = (matrixA, matrixB) => {
        let fma = fn.format(matrixA)
        let fmb = fn.format(matrixB)
        let product = []

        for (let i = 0; i < 4; i++) {
            let row = [fma[i], fma[i + 4], fma[i + 8], fma[i + 12]]
            for (let j = 0; j < 4; j++) {
                let k = j * 4
                let col = [fmb[k], fmb[k + 1], fmb[k + 2], fmb[k + 3]]
                let result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3]

                product[i + k] = result
            }
        }

        return product
    }
    fn.rotateX = (angle) => {
        let theta = (Math.PI / 180) * angle
        let matrix = fn.identity()

        matrix[5] = matrix[10] = Math.cos(theta)
        matrix[6] = matrix[9] = Math.sin(theta)
        matrix[9] *= -1

        return matrix
    }
    fn.rotateY = (angle) => {
        let theta = (Math.PI / 180) * angle
        let matrix = fn.identity()

        matrix[0] = matrix[10] = Math.cos(theta)
        matrix[2] = matrix[8] = Math.sin(theta)
        matrix[2] *= -1

        return matrix
    }
    fn.rotateZ = (angle) => {
        let theta = (Math.PI / 180) * angle
        let matrix = fn.identity()

        matrix[0] = matrix[5] = Math.cos(theta)
        matrix[1] = matrix[4] = Math.sin(theta)
        matrix[4] *= -1

        return matrix
    }
    fn.scale = (scalar, scalarY) => {
        let matrix = fn.identity()

        matrix[0] = scalar
        matrix[5] = typeof scalarY === 'number' ? scalarY : scalar

        return matrix
    }
    fn.translateX = (distance) => {
        let matrix = fn.identity()
        matrix[12] = distance
        return matrix
    }
    fn.translateY = (distance) => {
        let matrix = fn.identity()
        matrix[13] = distance
        return matrix
    }
    return {
        fromString: (source) => {
            return fn.fromString(source);
        },
        multiply: (matrixA, matrixB) => {
            return fn.multiply(matrixA, matrixB);
        },
        rotateX: (angle) => {
            return fn.rotateX(angle);
        },
        rotateY: (angle) => {
            return fn.rotateY(angle);
        },
        rotateZ: (angle) => {
            return fn.rotateZ(angle);
        },
        scale: (scalar, scalarY) => {
            return fn.scale(scalar, scalarY);
        },
        translateX: (distance) => {
            return fn.translateX(distance);
        },
        translateY: (distance) => {
            return fn.translateY(distance);
        },
    }
})();
Object.freeze(rematrix);

const scrollanimate = (()=>{
    let groups = {};
    let observer = new IntersectionObserver((entries, observer) => {
        stellar.requestAnimationFrame(()=>{
            entries.filter((entry)=>{return entry.isIntersecting}).sort((a,b)=>a.intersectionRect.y !== b.intersectionRect.y ? a.intersectionRect.y - b.intersectionRect.y : a.intersectionRect.x - b.intersectionRect.x).forEach((entry, index) => {
                observer.unobserve(entry.target);
                setTimeout(() => {
                    fn.applyStyle(entry.target, groups[entry.target.getAttribute('sa-group-id')].elements[entry.target.getAttribute('sa-id')].after);
                }, Math.max(groups[entry.target.getAttribute('sa-group-id')].config.interval, 16)*(index+1));
                entry.target.setAttribute('sa-status', 'true');
            });
        });
    });
    let fn = {};
    
    fn.getPrefixedCssProp = (() => {
        let properties = {}
        const style = document.documentElement.style

        function getPrefixedCssProperty(name, source = style) {
            if (name && typeof name === 'string') {
                if (properties[name]) {
                    return properties[name]
                }
                if (typeof source[name] === 'string') {
                    return (properties[name] = name)
                }
                if (typeof source[`-webkit-${name}`] === 'string') {
                    return (properties[name] = `-webkit-${name}`)
                }
                throw new RangeError(`Unable to find "${name}" style property.`)
            }
            throw new TypeError('Expected a string.')
        }

        getPrefixedCssProperty.clearCache = () => (properties = {})

        return getPrefixedCssProperty
    })()
    fn.style = (config, element) => {
        const computed = window.getComputedStyle(element)

        /**
         * Generate inline styles
         */
        const inline = {}
        const inlineStyle = element.getAttribute('style') || ''
        const inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || []

        inline.computed = inlineMatch ? inlineMatch.map(m => m.trim()).join('; ') + ';' : ''

        inline.generated = inlineMatch.some(m => m.match(/visibility\s?:\s?visible/i))
            ? inline.computed
            : [...inlineMatch, 'visibility: visible'].map(m => m.trim()).join('; ') + ';'

        /**
         * Generate opacity styles
         */
        const computedOpacity = parseFloat(computed.opacity)
        const configOpacity = !isNaN(parseFloat(config.opacity))
            ? parseFloat(config.opacity)
            : parseFloat(computed.opacity)

        const opacity = {
            computed: computedOpacity !== configOpacity ? `opacity: ${computedOpacity};` : '',
            generated: computedOpacity !== configOpacity ? `opacity: ${configOpacity};` : ''
        }

        /**
         * Generate transformation styles
         */
        const transformations = []

        if (parseFloat(config.distance)) {
            const axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X'

            /**
             * Let’s make sure our our pixel distances are negative for top and left.
             * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
             */
            let distance = config.distance
            if (config.origin === 'top' || config.origin === 'left') {
                distance = /^-/.test(distance) ? distance.substr(1) : `-${distance}`
            }

            const [value_str, unit] = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g)
            const value = parseFloat(value_str)
            switch (unit) {
                case 'em':
                    distance = parseInt(computed.fontSize) * value
                    break
                case 'px':
                    distance = value
                    break
                case '%':
                    /**
                     * Here we use `getBoundingClientRect` instead of
                     * the existing data attached to `element.geometry`
                     * because only the former includes any transformations
                     * current applied to the element.
                     *
                     * If that behavior ends up being unintuitive, this
                     * logic could instead utilize `element.geometry.height`
                     * and `element.geoemetry.width` for the distance calculation
                     */
                    distance =
                        axis === 'Y'
                            ? (element.getBoundingClientRect().height * value) / 100
                            : (element.getBoundingClientRect().width * value) / 100
                    break
                default:
                    throw new RangeError('Unrecognized or missing distance unit.')
            }

            if (axis === 'Y') {
                transformations.push(rematrix.translateY(distance))
            } else {
                transformations.push(rematrix.translateX(distance))
            }
        }

        if (config.rotate.x) transformations.push(rematrix.rotateX(config.rotate.x))
        if (config.rotate.y) transformations.push(rematrix.rotateY(config.rotate.y))
        if (config.rotate.z) transformations.push(rematrix.rotateZ(config.rotate.z))
        if (config.scale !== 1) {
            if (config.scale === 0) {
                /**
                 * The CSS Transforms matrix interpolation specification
                 * basically disallows transitions of non-invertible
                 * matrixes, which means browsers won't transition
                 * elements with zero scale.
                 *
                 * That’s inconvenient for the API and developer
                 * experience, so we simply nudge their value
                 * slightly above zero; this allows browsers
                 * to transition our element as expected.
                 *
                 * `0.0002` was the smallest number
                 * that performed across browsers.
                 */
                transformations.push(rematrix.scale(0.0002))
            } else {
                transformations.push(rematrix.scale(config.scale))
            }
        }

        const transform = {}
        if (transformations.length) {
            transform.property = fn.getPrefixedCssProp('transform')
            /**
             * The default computed transform value should be one of:
             * undefined || 'none' || 'matrix()' || 'matrix3d()'
             */
            transform.computed = {
                raw: computed[transform.property],
                matrix: rematrix.fromString(computed[transform.property])
            }

            transformations.unshift(transform.computed.matrix)
            const product = transformations.reduce(rematrix.multiply)

            transform.generated = {
                initial: `${transform.property}: matrix3d(${product.join(', ')});`,
                final: `${transform.property}: matrix3d(${transform.computed.matrix.join(', ')});`
            }
        } else {
            transform.generated = {
                initial: '',
                final: ''
            }
        }

        /**
         * Generate transition styles
         */
        let transition = {}
        if (opacity.generated || transform.generated.initial) {
            transition.property = fn.getPrefixedCssProp('transition')
            transition.computed = computed[transition.property]
            transition.fragments = []

            const { delay, duration, easing } = config

            if (opacity.generated) {
                transition.fragments.push({
                    delayed: `opacity ${duration / 1000}s ${easing} ${delay / 1000}s`,
                    instant: `opacity ${duration / 1000}s ${easing} 0s`
                })
            }

            if (transform.generated.initial) {
                transition.fragments.push({
                    delayed: `${transform.property} ${duration / 1000}s ${easing} ${delay / 1000}s`,
                    instant: `${transform.property} ${duration / 1000}s ${easing} 0s`
                })
            }

            /**
             * The default computed transition property should be undefined, or one of:
             * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
             */
            let hasCustomTransition =
                transition.computed && !transition.computed.match(/all 0s|none 0s/)

            if (hasCustomTransition) {
                transition.fragments.unshift({
                    delayed: transition.computed,
                    instant: transition.computed
                })
            }

            const composed = transition.fragments.reduce(
                (composition, fragment, i) => {
                    composition.delayed += i === 0 ? fragment.delayed : `, ${fragment.delayed}`
                    composition.instant += i === 0 ? fragment.instant : `, ${fragment.instant}`
                    return composition
                },
                {
                    delayed: '',
                    instant: ''
                }
            )

            transition.generated = {
                delayed: `${transition.property}: ${composed.delayed};`,
                instant: `${transition.property}: ${composed.instant};`
            }
        } else {
            transition.generated = {
                delayed: '',
                instant: ''
            }
        }

        let before = [
            inline.computed,
            opacity.generated,
            transform.generated.initial
        ]

        let after = [
            inline.generated,
            opacity.computed,
            transform.generated.final
        ]
        if (config.delay) {
            after.push(transition.generated.delayed)
        } else {
            after.push(transition.generated.instant)
        }

        return {
            // inline,
            // opacity,
            // position,
            // transform,
            // transition
            itself: inline.computed,
            before: before.filter((s) => s !== '').join(' '),
            after: after.filter((s) => s !== '').join(' ')
        }
    }
    /**
     * apply a CSS string to an element using the CSSOM (element.style) rather
     * than setAttribute, which may violate the content security policy.
     *
     * @param {Node}   [el]  Element to receive styles.
     * @param {string} [declaration] Styles to apply.
     */
    fn.applyStyle = (el, declaration) => {
        declaration.split(';').forEach(pair => {
            const [property, ...value] = pair.split(':')
            if (property && value) {
                el.style[property.trim()] = value.join(':')
            }
        })
    }
    fn.register = (group, options={}) => {
        groups[group] = {};
        groups[group].config = {};
        groups[group].config.opacity = options.opacity || 0;
        groups[group].config.distance = options.distance || '0';
        groups[group].config.duration = options.duration || 600;
        groups[group].config.interval = options.interval || 0;
        groups[group].config.delay = options.delay || 0;
        groups[group].config.scale = options.scale || 1;
        groups[group].config.easing = options.easing || 'cubic-bezier(0.5, 0, 0, 1)';
        groups[group].config.origin = options.origin || 'bottom';
        groups[group].config.rotate = options.rotate || {x: 0, y: 0, z: 0};
    }
    fn.apply = (group, toAnimateEles, options={}) => {
        groups[group] || fn.register(group, options);
        groups[group].elements = {};
        groups[group].eleNum = 0;
        toAnimateEles.forEach((ele)=>{
            let {itself, before, after} = fn.style(groups[group].config,ele);
            fn.applyStyle(ele, before);
            ele.setAttribute('sa-id', `sa-${groups[group].eleNum}`);
            ele.setAttribute('sa-group-id', `${group}`);
            groups[group].elements[`sa-${groups[group].eleNum}`] = {target: ele, before: before, after: after, itself: itself};
            groups[group].eleNum++;
            observer.observe(ele);
        });
    }
    fn.reset = (group) => {
        groups[group]?.elements && Object.entries(groups[group].elements).forEach(([saId, ele])=>{
            if (ele.target.getAttribute('sa-status') === 'true') {
                ele.target.setAttribute('style', ele.itself);
                fn.applyStyle(ele.target, ele.before);
                ele.target.removeAttribute('sa-status');
                observer.observe(ele.target);
            }
        });
    }
    fn.clean = (group) => {
        groups[group]?.elements && Object.entries(groups[group].elements).forEach(([saId, ele])=>{
            ele.target.setAttribute('style', ele.itself);
            if (ele.target.getAttribute('sa-status') !== 'true') {
                observer.unobserve(ele.target);
            } else {
                ele.target.removeAttribute('sa-status');
            }
            
        });
    }
    fn.destory = (group) => {
        groups[group]?.elements && Object.entries(groups[group].elements).forEach(([saId, ele])=>{
            ele.target.setAttribute('style', ele.itself);
            ele.target.removeAttribute('sa-id');
            ele.target.removeAttribute('sa-group-id');
            ele.target.getAttribute('sa-status') === 'true' && ele.target.removeAttribute('sa-status') && observer.unobserve(ele.target);
        });
        groups[group] = {};
    }
    fn.isGroup = (group) => {
        return groups[group] ? true : false;
    }
    return {
        register: (group, options={}) => {
            fn.register(group, options);
        },
        apply: (group,toAnimateEles, options={}) => {
            fn.apply(group,toAnimateEles,options);
        },
        reset: (group) => {
            fn.reset(group);
        },
        clean: (group) => {
            fn.clean(group);
        },
        isGroup: (group) => {
            return fn.isGroup(group);
        }
    }

})();
Object.freeze(scrollanimate);

let scrollAnimateConfig = {
    opacity: stellar.GLOBAL_CONFIG.plugins.scrollanimate.opacity,
    distance: stellar.GLOBAL_CONFIG.plugins.scrollanimate.distance,
    duration: stellar.GLOBAL_CONFIG.plugins.scrollanimate.duration,
    interval: stellar.GLOBAL_CONFIG.plugins.scrollanimate.interval,
    delay: stellar.GLOBAL_CONFIG.plugins.scrollanimate.delay,
    scale: stellar.GLOBAL_CONFIG.plugins.scrollanimate.scale,
    easing: stellar.GLOBAL_CONFIG.plugins.scrollanimate.easing,
    origin: stellar.GLOBAL_CONFIG.plugins.scrollanimate.origin,
    rotate: stellar.GLOBAL_CONFIG.plugins.scrollanimate.rotate
};
function getPlatformToAnimateEles() {
    let platform, toAnimateEles;
    if (document.documentElement.clientWidth > 768) {
        platform = 'desktop';
        toAnimateEles = document.querySelectorAll('.sa-load-hidden.desktop');
    } else {
        platform = 'mobile';
        toAnimateEles = document.querySelectorAll('.sa-load-hidden.mobile');
    }
    return {
        platform: platform, 
        toAnimateEles: toAnimateEles
    }
}
function scrollAnimateInit() {
    scrollanimate.apply(
        'commom',
        document.querySelectorAll('.sa-load-hidden:not(.desktop,.mobile)'), 
        scrollAnimateConfig
    );
    let {platform, toAnimateEles} = getPlatformToAnimateEles();
    scrollanimate.apply(
        platform,
        toAnimateEles, 
        scrollAnimateConfig
    );

    // 屏幕旋转
    window.addEventListener("orientationchange", function oc_callback() {
        // 旋转屏幕之后的屏幕大小变化 只是调用一次
        window.addEventListener("resize", function callback() {
            scrollanimate.reset('commom');
            if (document.documentElement.clientWidth > 768) {
                if (scrollanimate.isGroup('desktop')) {
                    scrollanimate.reset('desktop');
                } else {
                    scrollanimate.apply(
                        'desktop',
                        document.querySelectorAll('.sa-load-hidden.desktop'),
                        scrollAnimateConfig
                    );
                }
                // if (scrollanimate.isGroup('mobile')) {
                //     scrollanimate.clean('mobile');
                // }
            } else {
                if (scrollanimate.isGroup('mobile')) {
                    scrollanimate.reset('mobile');
                } else {
                    scrollanimate.apply(
                        'mobile',
                        document.querySelectorAll('.sa-load-hidden.mobile'),
                        scrollAnimateConfig
                    );
                }
                // if (scrollanimate.isGroup('desktop')) {
                //     scrollanimate.clean('desktop');
                // }
            }
            window.removeEventListener('resize', callback);
        });
        // window.removeEventListener('orientationchange', oc_callback);
    });
}

scrollAnimateInit();
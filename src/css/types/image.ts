import {CSSValue} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';
import {Color} from './color';
import {linearGradient} from './functions/linear-gradient';
import {prefixLinearGradient} from './functions/-prefix-linear-gradient';
import {ITypeDescriptor} from '../ITypeDescriptor';
import {CacheStorage} from '../../core/cache-storage';
import {LengthPercentage} from './length-percentage';
import {webkitGradient} from './functions/-webkit-gradient';
import {radialGradient} from './functions/radial-gradient';
import {prefixRadialGradient} from './functions/-prefix-radial-gradient';

export enum CSSImageType {
    URL,
    LINEAR_GRADIENT,
    RADIAL_GRADIENT,
    UNSUPPORTED
}

export const isLinearGradient = (background: ICSSImage): background is CSSLinearGradientImage => {
    return background.type === CSSImageType.LINEAR_GRADIENT;
};

export const isRadialGradient = (background: ICSSImage): background is CSSRadialGradientImage => {
    return background.type === CSSImageType.RADIAL_GRADIENT;
};

export interface UnprocessedGradientColorStop {
    color: Color;
    stop: LengthPercentage | null;
}

export interface GradientColorStop {
    color: Color;
    stop: number;
}

export interface ICSSImage {
    type: CSSImageType;
}

export interface CSSURLImage extends ICSSImage {
    url: string;
    type: CSSImageType.URL;
}

// interface ICSSGeneratedImage extends ICSSImage {}

export type GradientCorner = [LengthPercentage, LengthPercentage];

interface ICSSGradientImage extends ICSSImage {
    stops: UnprocessedGradientColorStop[];
}

export interface CSSLinearGradientImage extends ICSSGradientImage {
    angle: number | GradientCorner;
    type: CSSImageType.LINEAR_GRADIENT;
}

export enum CSSRadialShape {
    CIRCLE,
    ELLIPSE
}

export enum CSSRadialExtent {
    CLOSEST_SIDE,
    FARTHEST_SIDE,
    CLOSEST_CORNER,
    FARTHEST_CORNER
}

export interface UnsupportedImage extends ICSSImage {
    type: CSSImageType.UNSUPPORTED;
}

const FALLBACK_IMAGE: UnsupportedImage = {
    type: CSSImageType.UNSUPPORTED
};

export type CSSRadialSize = CSSRadialExtent | LengthPercentage[];

export interface CSSRadialGradientImage extends ICSSGradientImage {
    type: CSSImageType.RADIAL_GRADIENT;
    shape: CSSRadialShape;
    size: CSSRadialSize;
    position: LengthPercentage[];
}

export const image: ITypeDescriptor<ICSSImage> = {
    name: 'image',
    parse: (value: CSSValue): ICSSImage => {
        if (value.type === TokenType.URL_TOKEN) {
            const image: CSSURLImage = {url: value.value, type: CSSImageType.URL};
            CacheStorage.getInstance().addImage(value.value);
            return image;
        }

        if (value.type === TokenType.FUNCTION) {
            const imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
            if (typeof imageFunction === 'undefined') {
                console.warn(`Unsupported image function "${value.name}". Using fallback.`);
                return FALLBACK_IMAGE;
            }
            return imageFunction(value.values);
        }

        console.warn(`Unsupported image type. Using fallback.`);
        return FALLBACK_IMAGE;
    }
};

export function isSupportedImage(value: CSSValue) {
    return value.type !== TokenType.FUNCTION || SUPPORTED_IMAGE_FUNCTIONS[value.name];
}

const SUPPORTED_IMAGE_FUNCTIONS: Record<string, (args: CSSValue[]) => ICSSImage> = {
    'linear-gradient': linearGradient,
    '-moz-linear-gradient': prefixLinearGradient,
    '-ms-linear-gradient': prefixLinearGradient,
    '-o-linear-gradient': prefixLinearGradient,
    '-webkit-linear-gradient': prefixLinearGradient,
    'radial-gradient': radialGradient,
    '-moz-radial-gradient': prefixRadialGradient,
    '-ms-radial-gradient': prefixRadialGradient,
    '-o-radial-gradient': prefixRadialGradient,
    '-webkit-radial-gradient': prefixRadialGradient,
    '-webkit-gradient': webkitGradient
};

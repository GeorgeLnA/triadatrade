import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementRef,
  type ElementType,
  type ForwardedRef,
  type MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";

type PixelButtonCSSVars = CSSProperties & {
  "--pixel-color"?: string;
  "--pixel-size"?: string;
  "--pixel-contrast-color"?: string;
};

type PixelButtonBaseProps<T extends ElementType> = {
  as?: T;
  color?: string;
  pixelSize?: number;
};

type PixelButtonProps<T extends ElementType> = PixelButtonBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PixelButtonBaseProps<T>>;

type PixelButtonComponent = <T extends ElementType = "button">(
  props: PixelButtonProps<T> & { ref?: ForwardedRef<ElementRef<T>> }
) => JSX.Element;

const PixelButton = forwardRef(function PixelButtonInner<T extends ElementType = "button">(
  { children, className, color = "#ffffff", pixelSize = 10, as, ...rest }: PixelButtonProps<T>,
  forwardedRef: ForwardedRef<ElementRef<T>>
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resolvedColor = color?.trim() || "#ffffff";

  const contrastColor = useMemo(() => {
    const hex = resolvedColor.replace("#", "");
    if (hex.length === 3 || hex.length === 6) {
      const normalized =
        hex.length === 3 ? hex.split("").map(char => char + char).join("") : hex;
      const r = parseInt(normalized.slice(0, 2), 16) || 0;
      const g = parseInt(normalized.slice(2, 4), 16) || 0;
      const b = parseInt(normalized.slice(4, 6), 16) || 0;
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 186 ? "#000000" : "#ffffff";
    }
    return "#000000";
  }, [resolvedColor]);

  const setForwardedRef = useCallback(
    (node: ElementRef<T> | null) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<ElementRef<T> | null>).current = node;
      }
    },
    [forwardedRef]
  );

  const setElementRef = useCallback(
    (node: ElementRef<T> | null) => {
      elementRef.current = node as unknown as HTMLElement | null;
      setForwardedRef(node);
    },
    [setForwardedRef]
  );

  const generatePixels = useCallback(() => {
    const element = elementRef.current;
    const container = containerRef.current;

    if (!element || !container) return;

    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const cols = Math.max(1, Math.ceil(width / pixelSize));
    const rows = Math.max(1, Math.ceil(height / pixelSize));

    container.innerHTML = "";

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const pixel = document.createElement("div");
        pixel.className = "triada-pixel";
        pixel.style.left = `${col * pixelSize}px`;
        pixel.style.top = `${row * pixelSize}px`;
        pixel.style.transitionDelay = `${Math.random() * 0.3}s`;
        container.appendChild(pixel);
      }
    }
  }, [pixelSize]);

  useEffect(() => {
    generatePixels();

    const element = elementRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(() => generatePixels());
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [generatePixels]);

  const Component = (as ?? "button") as ElementType;

  return (
    <Component
      ref={setElementRef}
      className={cn("triada-pixel-btn", className)}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <span className="triada-pixel-label triada-pixel-label--base">{children}</span>
      <span className="triada-pixel-label triada-pixel-label--hover" aria-hidden="true">
        {children}
      </span>
      <div
        ref={containerRef}
        className="triada-pixel-container"
        style={
          {
            "--pixel-color": resolvedColor,
            "--pixel-size": `${pixelSize}px`,
            "--pixel-contrast-color": contrastColor
          } as PixelButtonCSSVars
        }
      />
    </Component>
  );
}) as PixelButtonComponent;

export { PixelButton };
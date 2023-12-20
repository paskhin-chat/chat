import { FC, ReactNode, useEffect, useRef } from "react";

interface IProps {
  onIntersect: () => void;
  target: ReactNode;
  children: ReactNode;
}

export const IntersectionSpy: FC<IProps> = ({
  children,
  onIntersect,
  target,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const onIntersectRef = useRef<() => void>();
  onIntersectRef.current = onIntersect;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        onIntersectRef.current?.();
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={targetRef}>{target}</div>

      {children}
    </>
  );
};

// /lib/use-body-scroll-lock.ts
"use client";
import { useEffect } from "react";

/**
 * Bloquea el scroll con contador global:
 * - Preserva posición sin saltos.
 * - Compensa la barra de scroll aplicando padding-right en el BODY (no en html).
 * - Funciona bien con varios overlays a la vez (cart, lightbox, menú móvil).
 */

let lockCount = 0;
let savedScrollY = 0;
let savedBodyPaddingRight = "";
let appliedPadding = false;

function acquireLock() {
  if (lockCount === 0) {
    const html = document.documentElement;
    const body = document.body;

    // Guarda posición actual
    savedScrollY = window.scrollY || window.pageYOffset || 0;

    // Ancho de barra de scroll
    const sbw = window.innerWidth - html.clientWidth;

    // Compensa ensanchamiento aplicando padding a BODY (clave para evitar "saltitos")
    if (sbw > 0) {
      savedBodyPaddingRight = body.style.paddingRight || "";
      appliedPadding = true;
      body.style.paddingRight = `${sbw}px`;
    } else {
      appliedPadding = false;
    }

    // Bloqueo de scroll
    html.style.overscrollBehavior = "none"; // suprime rebote
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    (body.style).touchAction = "none"; // iOS
  }
  lockCount += 1;
}

function releaseLock() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const html = document.documentElement;
  const body = document.body;

  // Restaurar estilos
  html.style.overscrollBehavior = "";
  (body.style).touchAction = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  if (appliedPadding) {
    body.style.paddingRight = savedBodyPaddingRight;
  }

  // Volver exactamente a la posición previa
  window.scrollTo(0, savedScrollY);
}

/**
 * Hook público
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (locked) {
      acquireLock();
      return () => releaseLock();
    }
    releaseLock();
    return () => {};
  }, [locked]);
}

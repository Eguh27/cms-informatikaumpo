'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './parallax.css'

gsap.registerPlugin(ScrollTrigger)

function splitWords(element: HTMLElement) {
  if (element.dataset.splitReady === 'true') return
  const text = element.textContent || ''
  const parts = text.split(/(\s+)/)
  element.textContent = ''
  element.setAttribute('aria-label', text.trim())
  parts.forEach((part) => {
    if (!part.trim()) {
      element.appendChild(document.createTextNode(part))
      return
    }
    const mask = document.createElement('span')
    const word = document.createElement('span')
    mask.className = 'px-split-mask'
    word.className = 'px-split-word'
    word.textContent = part
    mask.setAttribute('aria-hidden', 'true')
    mask.appendChild(word)
    element.appendChild(mask)
  })
  element.dataset.splitReady = 'true'
}

export function ParallaxEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set('[data-split-reveal]', { clearProps: 'all' })
      return
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // 1. Split-text kinetic typography (skip hero: it has its own intro timeline;
      // double-targeting hero text causes hidden-text flashes)
      gsap.utils.toArray<HTMLElement>('[data-split-reveal]').forEach((el) => {
        if (el.closest('[data-px-hero-card]')) return
        splitWords(el)
        const words = el.querySelectorAll('.px-split-word')
        if (!words.length) return
        gsap.fromTo(
          words,
          { yPercent: 115, autoAlpha: 0, filter: 'blur(6px)' },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          },
        )
      })

      // 2. Section reveals (once, composed)
      gsap.utils.toArray<HTMLElement>('[data-story-section]').forEach((section) => {
        const items = section.querySelectorAll('[data-reveal-item]')
        const targets = items.length ? items : section.children
        gsap.fromTo(
          targets,
          { y: 36, autoAlpha: 0, filter: 'blur(6px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power4.out',
            stagger: 0.08,
            scrollTrigger: { trigger: section, start: 'top 84%', once: true },
          },
        )
      })

      // 3. Parallax layers (scrubbed, subtle)
      gsap.utils.toArray<HTMLElement>('[data-parallax-layer]').forEach((layer) => {
        const speed = Number(layer.dataset.speed || -0.14)
        const section = layer.closest('[data-parallax-section]') || layer.parentElement
        if (!section) return
        gsap.to(layer, {
          y: () => window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section as Element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      // 5. Hero intro (plays once on load)
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .fromTo('[data-px-building]', { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 0)
        .fromTo('[data-px-cloud-a]', { x: -70, autoAlpha: 0 }, { x: 0, autoAlpha: 0.7, duration: 1.2 }, 0.1)
        .fromTo('[data-px-cloud-b]', { x: 70, autoAlpha: 0 }, { x: 0, autoAlpha: 0.5, duration: 1.2 }, 0.15)
        .fromTo('[data-px-hero-card]', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.25)
        .fromTo('[data-px-hero-meta]', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.09 }, 0.45)
        .fromTo('[data-px-stats]', { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.6)

      // Cloud idle drift
      gsap.to('[data-px-cloud-a]', { x: '+=14', y: '-=5', duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('[data-px-cloud-b]', { x: '-=12', y: '-=4', duration: 23, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      // 6. Footer handoff
      const footer = document.querySelector('[data-footer-parallax]')
      if (footer) {
        gsap.fromTo(
          footer,
          { yPercent: -8, autoAlpha: 0.9 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top 55%', scrub: 1 },
          },
        )
      }
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}

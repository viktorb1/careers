import { render, screen } from '@testing-library/vue'
import axios from 'axios'

import SpotLight from '@/components/JobSearch/SpotLight.vue'

import type { Mock } from 'vitest'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('SpotLight', () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some image',
          title: 'Some title',
          description: 'Some description',
          ...spotlight
        }
      ]
    })
  }

  it('provides image to parent component', async () => {
    const spotlight = { img: 'Other image' }
    mockSpotlightsResponse(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template v-slot:default="slotProps"><h1>{{ slotProps.img }}</h1></template>`
      }
    })

    const text = await screen.findByText('Other image')
    expect(text).toBeInTheDocument()
  })

  it('provides a title to parent component', async () => {
    const spotlight = { title: 'Other title' }
    mockSpotlightsResponse(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template v-slot:default="slotProps"><h1>{{ slotProps.title }}</h1></template>`
      }
    })

    const text = await screen.findByText('Other title')
    expect(text).toBeInTheDocument()
  })

  it('provides a description to parent component', async () => {
    const spotlight = { description: 'Other description' }
    mockSpotlightsResponse(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template v-slot:default="slotProps"><h1>{{ slotProps.description }}</h1></template>`
      }
    })

    const text = await screen.findByText('Other description')
    expect(text).toBeInTheDocument()
  })
})

'use client'

import { useState } from 'react'
import { Page } from '@/payload-types'
import { Form } from 'radix-ui'

/**
 * Props type for the newsletter block extracted from Page layout
 * @typedef {Extract<Page['layout'][0], { blockType: 'newsletter-form' }>} NewsletterProps
 */
type NewsletterProps = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'newsletter-form' }
>
/**
 * Form state type for managing form submission states
 * @typedef {Object} FormState
 * @property {boolean} loading - Indicates if form is currently submitting
 * @property {string | null} error - Error message if submission failed, null otherwise
 * @property {boolean} success - Indicates if form was submitted successfully
 */
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * NewsletterBlock component
 *
 * This component displays a newsletter form and handles form submission.
 * It uses the Payload CMS form fields to create the form and handle submission.
 * The form supports various input types and provides feedback on submission status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {NewsletterProps} props.block - Newsletter block configuration from Payload CMS
 * @returns {JSX.Element} Newsletter form component
 */
export default function NewsletterBlock({ block }: { block: NewsletterProps }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Handles form submission
   * Submits form data to the API and manages submission state
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   * @returns {Promise<void>}
   * @throws {Error} When form submission fails
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!block.form || typeof block.form !== 'object') return

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      // Reset the form
      ;(event.target as HTMLFormElement).reset()

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          error: 'Submission failed. Please try again.',
          success: false,
        })
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className="bg-gray-300 py-10">
      <div className="container mx-auto">
        {typeof block?.form === 'object' && block?.form?.title === 'newsletter-form-1' && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold">{block.heading}</h2>
            <Form.Root className="grid gap-6" onSubmit={handleSubmit}>
              {/* Global Form Messages */}
              {formState.error && <p className="text-red-600">{formState.error}</p>}
              {formState.success && <p className="text-green-600">Form submitted successfully!</p>}
              {block.form.fields?.map((field: any) => (
                <Form.Field className="grid gap-2" key={field.id} name={field.name}>
                  <Form.Label className="font-bold">{field.label}</Form.Label>
                  <Form.Message className="text-red-600" match="valueMissing">
                    {field.label} is required
                  </Form.Message>
                  <Form.Message className="text-red-600" match="typeMismatch">
                    Please enter a valid {field.label}
                  </Form.Message>
                  <Form.Control
                    className="border-2 border-black p-2"
                    type={field.blockType}
                    placeholder={field.label}
                    required={field.required}
                  />
                </Form.Field>
              ))}
              <Form.Submit asChild>
                <button
                  className="p-4 text-white bg-black cursor-pointer"
                  type="submit"
                  disabled={formState.loading}
                >
                  {formState.loading ? 'Submitting...' : block.form.submitButtonLabel || 'Submit'}
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        )}
      </div>
    </section>
  )
}

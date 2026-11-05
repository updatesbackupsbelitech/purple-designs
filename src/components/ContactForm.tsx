import { useId, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { contactForm } from '../data/contact'
import { sendMessage } from '../utils/sendMessage'
import AlertDialog from './AlertDialog'
import Icon from './Icon'
import styles from './ContactForm.module.css'

type FieldName = 'name' | 'subject' | 'email' | 'phone' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

interface AlertState {
  type: 'success' | 'error'
  title: string
  message: string
}

const emptyValues: Values = { name: '', subject: '', email: '', phone: '', message: '' }

// The order used to find the first mistake and move the cursor to it
const fieldOrder: FieldName[] = ['name', 'email', 'phone', 'subject', 'message']

function validate(values: Values): Errors {
  const errors: Errors = {}
  const digits = values.phone.replace(/\D/g, '')

  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (values.subject.trim().length < 3) errors.subject = 'Please enter a subject.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!/^[+()\d\s-]+$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number, for example +233 XX XXX XXXX.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.'
  }
  return errors
}

// ---------- One labelled field (input or text area) with its error message ----------
interface FieldProps {
  id: string
  name: FieldName
  label: string
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: () => void
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  placeholder?: string
  maxLength?: number
  multiline?: boolean
}

function Field({
  id,
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  autoComplete,
  placeholder,
  maxLength,
  multiline = false,
}: FieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    maxLength,
    autoComplete,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: `${styles.control} ${error ? styles.invalid : ''}`,
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        <span aria-hidden="true"> *</span>
      </label>
      {multiline ? <textarea {...shared} rows={6} /> : <input {...shared} type={type} />}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

// ---------- The form ----------
function ContactForm() {
  const uid = useId()
  const [values, setValues] = useState<Values>(emptyValues)
  const [trap, setTrap] = useState('') // hidden spam trap
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)

  const errors = validate(values)
  const idFor = (field: FieldName) => `${uid}-${field}`
  const errorFor = (field: FieldName) => (submitted || touched[field] ? errors[field] : undefined)

  const update = (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
  }
  const markTouched = (field: FieldName) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    setSubmitted(true)
    const firstInvalid = fieldOrder.find((field) => errors[field])
    if (firstInvalid) {
      document.getElementById(idFor(firstInvalid))?.focus()
      return
    }

    setSending(true)
    try {
      await sendMessage({
        name: values.name.trim(),
        subject: values.subject.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        website: trap,
      })

      const firstName = values.name.trim().split(/\s+/)[0]
      setAlert({
        type: 'success',
        title: contactForm.successTitle,
        message: contactForm.successMessage.replace('{name}', firstName),
      })
      setValues(emptyValues)
      setTouched({})
      setSubmitted(false)
    } catch (error) {
      setAlert({
        type: 'error',
        title: contactForm.errorTitle,
        message: error instanceof Error ? error.message : contactForm.errorMessage,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={sending}>
        <div className={styles.row}>
          <Field
            id={idFor('name')}
            name="name"
            label="Full name"
            autoComplete="name"
            maxLength={100}
            value={values.name}
            error={errorFor('name')}
            onChange={update('name')}
            onBlur={markTouched('name')}
          />
          <Field
            id={idFor('email')}
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            maxLength={150}
            value={values.email}
            error={errorFor('email')}
            onChange={update('email')}
            onBlur={markTouched('email')}
          />
        </div>

        <div className={styles.row}>
          <Field
            id={idFor('phone')}
            name="phone"
            type="tel"
            label="Phone number"
            autoComplete="tel"
            placeholder="+233 XX XXX XXXX"
            maxLength={30}
            value={values.phone}
            error={errorFor('phone')}
            onChange={update('phone')}
            onBlur={markTouched('phone')}
          />
          <Field
            id={idFor('subject')}
            name="subject"
            label="Subject"
            autoComplete="off"
            maxLength={150}
            value={values.subject}
            error={errorFor('subject')}
            onChange={update('subject')}
            onBlur={markTouched('subject')}
          />
        </div>

        <Field
          id={idFor('message')}
          name="message"
          label="Message"
          multiline
          maxLength={2000}
          value={values.message}
          error={errorFor('message')}
          onChange={update('message')}
          onBlur={markTouched('message')}
        />

        {/* Spam trap: invisible to people, tempting to robots */}
        <div className={styles.trap} aria-hidden="true">
          <label>
            Leave this field empty
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
            />
          </label>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={sending}>
            {sending ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Icon name="send" size={18} />
              </>
            )}
          </button>
          <p className={styles.note}>All fields are required.</p>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {sending ? 'Sending your message' : ''}
        </p>
      </form>

      {alert && (
        <AlertDialog
          type={alert.type}
          title={alert.title}
          message={alert.message}
          buttonLabel={alert.type === 'success' ? 'Done' : 'Try again'}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  )
}

export default ContactForm
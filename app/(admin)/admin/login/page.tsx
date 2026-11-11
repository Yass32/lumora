import Image from 'next/image'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/LoginForm'
import { getCurrentUser } from '@/lib/auth'

export const metadata = { title: 'Staff login' }
export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/admin/content')
  return (
    <div className="flex min-h-screen flex-wrap bg-cream">
      <div className="flex min-w-0 flex-[1_1_480px] flex-col justify-between gap-12 bg-forest p-8 text-on-dark-strong sm:p-14">
        <a href="/en" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-on-dark-strong no-underline hover:text-white">
          <span aria-hidden="true">←</span> Back to website
        </a>
        <div className="flex max-w-[460px] flex-col gap-6">
          <div className="h-[140px] w-[140px] rounded-[20px] bg-white p-2">
            <Image src="/images/lumora-logo.jpg" alt="Lumora Global Education logo" width={124} height={124} className="h-full w-full object-contain" priority />
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-white">Lumora content studio</h1>
          <p className="text-[17px] leading-relaxed text-on-dark">
            Update the website, add student stories and team photos, manage translations, and follow up on consultation requests, all in one place.
          </p>
        </div>
        <p className="font-display text-xl italic text-gold">Guiding your future, wherever it begins.</p>
      </div>
      <div className="flex min-w-0 flex-[1_1_480px] items-center justify-center px-6 py-14">
        <LoginForm />
      </div>
    </div>
  )
}

import ContactUs from "@/components/contactPage/contactHero"
import ContactSection from "@/components/contactPage/contactSection"
import EmailsSection from "@/components/contactPage/emailsSection"
import FAQSection from "@/components/contactPage/faqSection"
import CTASection from "@/components/shared/ctaSection"

export default function ContactPage() {
	return (
		<div>
			<ContactUs />
			<ContactSection />
			<EmailsSection/>
			<FAQSection />
			<CTASection />
		</div>
	)
}

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "./Earth";

const Contact3D = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate email sending (you can integrate with EmailJS or your preferred service)
    setTimeout(() => {
      alert("Votre message a été envoyé. Je vous répondrai dès que possible.");
      setForm({ name: '', email: '', message: '' });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -20, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="bg-black/20 backdrop-blur-sm flex-[0.75] rounded-2xl p-8 border border-primary/20"
      >
        <div className="mb-8">
          <h3 className="text-3xl font-orbitron font-bold text-primary mb-4">
            Entrons en contact
          </h3>
          <p className="text-foreground/80 font-inter">
            Que vous souhaitiez créer un nouveau site web, améliorer votre plateforme existante, 
            ou donner vie à un projet unique, je suis là pour vous aider.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Nom complet</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="bg-black/30 placeholder:text-gray-400 rounded-lg border border-primary/30 px-6 py-4 font-medium text-white outline-none focus:border-primary transition-colors"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              className="bg-black/30 placeholder:text-gray-400 rounded-lg border border-primary/30 px-6 py-4 font-medium text-white outline-none focus:border-primary transition-colors"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Votre message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Bonjour, je suis intéressé par votre travail..."
              rows={7}
              className="bg-black/30 placeholder:text-gray-400 rounded-lg border border-primary/30 px-6 py-4 font-medium text-white outline-none focus:border-primary transition-colors resize-none"
            />
          </label>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Envoyer"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <div className="relative w-full h-full">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default Contact3D; 
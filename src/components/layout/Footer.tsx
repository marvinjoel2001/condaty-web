
export default function Footer() {
    return (
      <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 Condaty. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00e38c] text-sm transition-colors"
              >
                Términos y condiciones
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00e38c] text-sm transition-colors"
              >
                Política de privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
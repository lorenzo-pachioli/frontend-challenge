
import './Cotizacion.css'
import { useShoppingCart } from '../hooks/shopingCartProvider';
import { formatPrice } from '../utils/priceUtils';
import { useState,useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { CartItem } from '../types/Product';

interface IForm {
  company: string;
  cuil: string;
  email: string;
  cart: CartItem[]
}

interface IFormErrors {
  company?: string;
  cuil?: string;
  email?: string;
}

const Cotizacion = () => {
    const [form, setForm] = useState<IForm>({
      company: '',
      cuil: '',
      email: '',
      cart: []
    });
    const [errors, setErrors] = useState<IFormErrors>({});
    const { cartItems } = useShoppingCart();
    
    //const contentRef = useRef<HTMLFormElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    // Funciones de validación
    const validateCompany = (company: string): string | undefined => {
      if (!company.trim()) return 'El nombre de la empresa es requerido';
      if (company.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s&.,()-]+$/.test(company)) return 'Solo se permiten letras, espacios y caracteres especiales básicos';
      return undefined;
    };

    const validateCuil = (cuil: string): string | undefined => {
      if (!cuil.trim()) return 'El CUIL es requerido';
      const cuilNumbers = cuil.replace(/[-\s]/g, '');
      if (!/^\d{11}$/.test(cuilNumbers)) return 'El CUIL debe tener 11 dígitos';
      
      // Validación básica de formato CUIL
      const cuilArray = cuilNumbers.split('').map(Number);
      const verificador = cuilArray[10];
      const secuencia = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      let suma = 0;
      
      for (let i = 0; i < 10; i++) {
        suma += cuilArray[i] * secuencia[i];
      }
      
      const resto = suma % 11;
      const digitoVerificador = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
      
      if (digitoVerificador !== verificador) return 'CUIL inválido';
      return undefined;
    };

    const validateEmail = (email: string): string | undefined => {
      if (!email.trim()) return 'El email es requerido';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return 'Formato de email inválido';
      return undefined;
    };

    // Handlers con validación
    const handleCompanyChange = (value: string) => {
      setForm({ ...form, company: value });
      const error = validateCompany(value);
      setErrors(prev => ({ ...prev, company: error }));
    };

    const handleCuilChange = (value: string) => {
      // Solo permitir números, guiones y espacios
      const cleanValue = value.replace(/[^0-9-\s]/g, '');
      setForm({ ...form, cuil: cleanValue });
      const error = validateCuil(cleanValue);
      setErrors(prev => ({ ...prev, cuil: error }));
    };

    const handleEmailChange = (value: string) => {
      setForm({ ...form, email: value });
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, email: error }));
    };

    const isFormValid = () => {
      return !validateCompany(form.company) && 
             !validateCuil(form.cuil) && 
             !validateEmail(form.email) &&
             cartItems.length > 0;
    };

    return(
    <div className="product-detail-page">
      <div className="container" ref={contentRef}>

        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Cotizacion de Productos de SWAG Challenge</h1>
            <p className="page-subtitle p1">
              Completa el formulario para solicitar una cotización personalizada de los productos seleccionados.
            </p>
          </div>
        </div>

        <form className='cotizacion-form'  onSubmit={(e) =>e.preventDefault()}>
            <div className="form-group">
                <label className='filter-title p1-medium' htmlFor="company">Nombre de la empresa</label>
                <input 
                  className={`form-input search-input p1 ${errors.company ? 'error' : ''}`} 
                  type="text" 
                  id="company" 
                  value={form?.company} 
                  onChange={e => handleCompanyChange(e.target.value)} 
                  required 
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
            <div className="form-group">
                <label className='filter-title p1-medium' htmlFor="cuil">CUIL</label>
                <input 
                  className={`form-input search-input p1 ${errors.cuil ? 'error' : ''}`} 
                  type="text" 
                  id="cuil" 
                  value={form?.cuil} 
                  onChange={e => handleCuilChange(e.target.value)} 
                  placeholder="20-12345678-9"
                  maxLength={13}
                  required 
                />
                {errors.cuil && <span className="error-message">{errors.cuil}</span>}
            </div>
            <div className="form-group">
                <label className='filter-title p1-medium' htmlFor="email">Email</label>
                <input 
                  className={`form-input search-input p1 ${errors.email ? 'error' : ''}`} 
                  value={form?.email} 
                  onChange={e => handleEmailChange(e.target.value)} 
                  type="email" 
                  id="email" 
                  placeholder="ejemplo@empresa.com"
                  required 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group filter-section">
                <h3 className="filter-title p1-medium">Productos</h3>
                <div className="product-list">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio por unidad</th>
                      <th>Precio Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        cartItems.map(item => (
                          <tr key={item.id}>
                            <td className="product-item">{item.id}</td>
                            <td className="product-item">{item.name}</td>
                            <td className="product-item">{item.quantity}</td>
                            <td className="product-item">{item.unitPrice}</td>
                            <td className="product-item">{item.totalPrice}</td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
                </div>
            </div>


            <div className='form-group total-section'>
                <label>Total</label>
                <span>{formatPrice(cartItems.reduce((total, item) => total + item.totalPrice, 0))}</span>
            </div>

            <button 
              className={`submit-button ${isFormValid() ? 'active' : 'disabled'}`} 
              type="submit" 
              onClick={() => {
                if (isFormValid()) {
                  reactToPrintFn();
                }
              }}
              disabled={!isFormValid()}
            >
              Solicitar Cotización
            </button>
        </form>
        
            
      </div>
    </div>
  )
}

export default Cotizacion;


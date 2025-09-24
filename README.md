# Visual Art Studio - Site de Comunicação Visual

## Descrição
Site moderno e responsivo para empresa de comunicação visual, inspirado no design do visual-propaganda.com. O projeto transforma a estrutura original de estoque em uma galeria elegante de produtos de arte visual com sistema de carrinho e integração com WhatsApp e e-mail.

## Características Principais

### 🎨 Design Moderno
- Layout responsivo e mobile-first
- Carrossel infinito de imagens no hero
- Gradientes e animações suaves
- Paleta de cores vibrante (roxo, rosa, laranja)
- Tipografia moderna (Poppins)

### 🛍️ Sistema de E-commerce
- Galeria de produtos com modal elegante
- Sistema de carrinho de compras
- Contador de itens no header
- Preços com desconto destacados
- Especificações técnicas detalhadas

### 📱 Integração de Comunicação
- **WhatsApp**: Envio automático de pedidos formatados
- **E-mail**: Formulário de contato integrado
- **Botão flutuante**: WhatsApp sempre acessível
- **Formulário de contato**: Com validação

### 🎯 Funcionalidades
- Navegação suave entre seções
- Modais interativos para produtos
- Notificações de feedback
- Animações e transições
- Carrossel infinito automático

## Estrutura de Arquivos

```
visual_art_site/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript funcional
├── products.json       # Dados dos produtos
├── images/             # Imagens do carrossel
│   ├── r38cKXPtRAZ5.jpg
│   ├── BuvfH47mUoX5.png
│   ├── D3ch2RmEw5ME.jpg
│   └── a0kcqatXzAyg.jpg
└── README.md           # Esta documentação
```

## Produtos Disponíveis

O site apresenta 12 categorias de produtos de comunicação visual:

1. **Banner Promocional** - Impressão
2. **Fachada Comercial** - Fachadas  
3. **Adesivo Decorativo** - Adesivos
4. **Letra Caixa 3D** - Letras
5. **Placa Informativa** - Placas
6. **Totem Publicitário** - Totens
7. **Painel LED** - Digital
8. **Luminoso Neon** - Luminosos
9. **Wind Banner** - Banners
10. **Placa de Obra** - Construção
11. **Sinalização Interna** - Sinalização
12. **Display Promocional** - Displays

## Como Usar

### Executar Localmente
```bash
# Navegar para o diretório
cd visual_art_site

# Iniciar servidor HTTP
python3 -m http.server 8080

# Acessar no navegador
http://localhost:8080
```

### Funcionalidades do Site

#### 1. Navegação
- Menu fixo no topo
- Links suaves para seções
- Botão de carrinho com contador

#### 2. Produtos
- Clique em "Ver Detalhes" para abrir modal
- Clique em "Adicionar" para incluir no carrinho
- Modal mostra especificações completas

#### 3. Carrinho
- Clique no ícone do carrinho no header
- Visualize itens adicionados
- Remova itens individualmente
- Envie pedido via WhatsApp

#### 4. Contato
- Formulário na seção de contato
- Botão flutuante do WhatsApp
- Integração automática com WhatsApp e e-mail

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox/Grid
- **JavaScript**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Poppins

## Integração WhatsApp

O sistema gera mensagens formatadas automaticamente:

```
🛒 *Pedido de Orçamento - Visual Art Studio*

📋 *Itens solicitados:*
• Banner Promocional - Qtd: 1 - R$ 475

💰 *Total estimado:* R$ 475

📞 Gostaria de receber um orçamento detalhado para estes produtos.

Obrigado!
```

## Responsividade

O site é totalmente responsivo com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## Personalização

### Cores (CSS Variables)
```css
--primary-color: #6366f1;    /* Roxo principal */
--secondary-color: #f59e0b;  /* Laranja */
--accent-color: #ec4899;     /* Rosa */
```

### WhatsApp
Altere o número no arquivo `script.js`:
```javascript
const whatsappUrl = `https://wa.me/5542999999999?text=${encodeURIComponent(message)}`;
```

### E-mail
Altere o e-mail no arquivo `script.js`:
```javascript
const emailUrl = `mailto:contato@visualartstudio.com?subject=...`;
```

## Melhorias Futuras

- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Integração com gateway de pagamento
- [ ] Sistema de avaliações
- [ ] Chat online
- [ ] Blog integrado
- [ ] SEO otimizado
- [ ] PWA (Progressive Web App)

## Suporte

Para dúvidas ou suporte técnico, entre em contato através do formulário do site ou WhatsApp integrado.

---

**Desenvolvido com ❤️ para Visual Art Studio**


# 🚀 Guia de Configuração - GitHub Pages + Decap CMS

Este guia explica como configurar o site no GitHub Pages com o painel administrativo Decap CMS.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório criado no GitHub
- GitHub Pages habilitado no repositório

## 🔧 Configuração Passo a Passo

### 1. Preparar o Repositório

1. **Criar repositório no GitHub:**
   ```
   Nome: visual-art-studio (ou nome de sua escolha)
   Visibilidade: Público (necessário para GitHub Pages gratuito)
   ```

2. **Fazer upload dos arquivos:**
   - Faça upload de todos os arquivos do projeto para o repositório
   - Certifique-se de que o arquivo `index.html` está na raiz

3. **Habilitar GitHub Pages:**
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Clique em Save

### 2. Configurar o Decap CMS

1. **Editar arquivo `/admin/config.yml`:**
   ```yaml
   backend:
     name: github
     repo: SEU-USUARIO/visual-art-studio  # ⚠️ ALTERE AQUI
     branch: main
     site_domain: SEU-USUARIO.github.io   # ⚠️ ALTERE AQUI
   ```

2. **Configurar OAuth App no GitHub:**
   - Vá em GitHub Settings > Developer settings > OAuth Apps
   - Clique em "New OAuth App"
   - Preencha:
     ```
     Application name: Visual Art Studio CMS
     Homepage URL: https://SEU-USUARIO.github.io/visual-art-studio
     Authorization callback URL: https://api.netlify.com/auth/done
     ```
   - Anote o Client ID e Client Secret

3. **Configurar Netlify Identity (Gratuito):**
   - Acesse [netlify.com](https://netlify.com) e crie uma conta
   - Vá em Sites > Add new site > Import an existing project
   - Conecte com GitHub e selecione seu repositório
   - Após o deploy, vá em Site settings > Identity
   - Clique em "Enable Identity"
   - Em Registration preferences, selecione "Invite only"
   - Em External providers, adicione GitHub com seu Client ID e Secret

### 3. Configurar Autenticação

1. **Adicionar domínio autorizado:**
   - No Netlify, vá em Site settings > Identity > Settings
   - Em "Git Gateway", clique em "Enable Git Gateway"
   - Isso permitirá que o CMS acesse seu repositório GitHub

2. **Convidar usuários:**
   - Vá em Identity > Invite users
   - Adicione seu e-mail para ter acesso ao painel administrativo

### 4. Acessar o Painel Administrativo

1. **URL do painel:**
   ```
   https://SEU-USUARIO.github.io/visual-art-studio/admin/
   ```

2. **Primeiro acesso:**
   - Clique em "Login with Netlify Identity"
   - Aceite o convite enviado por e-mail
   - Defina sua senha
   - Faça login no painel

## 🎯 Funcionalidades do Painel

### 📦 Gerenciar Produtos
- **Adicionar produtos:** Clique em "Produtos" > "New Produto"
- **Editar produtos:** Clique em qualquer produto existente
- **Campos disponíveis:**
  - Nome, categoria, descrição
  - Preços (original e com desconto)
  - Imagens
  - Especificações técnicas
  - Características
  - Status (ativo/inativo)

### 🖼️ Gerenciar Carrossel
- **Adicionar imagens:** Clique em "Imagens do Carrossel" > "New Imagem"
- **Definir ordem:** Use o campo "Ordem de Exibição"
- **Ativar/desativar:** Use o campo "Ativa"

### ⚙️ Configurações do Site
- **Informações gerais:** Nome da empresa, slogan, descrição
- **Contato:** WhatsApp, e-mail, endereço
- **Redes sociais:** Facebook, Instagram, LinkedIn

### 📋 Visualizar Pedidos
- **Pedidos recebidos:** Visualize pedidos enviados via WhatsApp
- **Status:** Acompanhe o status de cada pedido
- **Observações:** Adicione notas internas

## 🔄 Fluxo de Trabalho

1. **Editar conteúdo:** Use o painel administrativo
2. **Salvar alterações:** O CMS faz commit automático no GitHub
3. **Deploy automático:** GitHub Pages atualiza o site automaticamente
4. **Visualizar:** As alterações aparecem no site em alguns minutos

## 🛠️ Personalização Avançada

### Adicionar Novos Campos
Edite o arquivo `/admin/config.yml` para adicionar novos campos aos produtos:

```yaml
fields:
  - {label: "Novo Campo", name: "novo_campo", widget: "string"}
```

### Tipos de Widgets Disponíveis
- `string`: Texto simples
- `text`: Texto longo
- `number`: Números
- `boolean`: Verdadeiro/Falso
- `date`: Data
- `datetime`: Data e hora
- `image`: Upload de imagem
- `file`: Upload de arquivo
- `select`: Lista de opções
- `list`: Lista de itens
- `object`: Objeto com sub-campos

### Modificar Coleções
Adicione novas coleções no arquivo `config.yml`:

```yaml
collections:
  - name: "nova_colecao"
    label: "Nova Coleção"
    folder: "_nova_colecao"
    create: true
    fields:
      - {label: "Título", name: "title", widget: "string"}
```

## 🚨 Solução de Problemas

### Erro de Autenticação
- Verifique se o OAuth App está configurado corretamente
- Confirme se o Git Gateway está habilitado no Netlify

### Painel não carrega
- Verifique se o arquivo `/admin/config.yml` está correto
- Confirme se o repositório e branch estão corretos

### Alterações não aparecem
- Aguarde alguns minutos para o deploy do GitHub Pages
- Verifique se o commit foi feito no repositório

### Imagens não carregam
- Certifique-se de que as imagens estão na pasta `images/`
- Verifique se o caminho no `config.yml` está correto

## 📞 Suporte

Para dúvidas sobre:
- **Decap CMS:** [Documentação oficial](https://decapcms.org/docs/)
- **GitHub Pages:** [Documentação GitHub](https://docs.github.com/pages)
- **Netlify Identity:** [Documentação Netlify](https://docs.netlify.com/visitor-access/identity/)

## 🎉 Pronto!

Seu site está configurado com:
- ✅ Hospedagem gratuita no GitHub Pages
- ✅ Painel administrativo funcional
- ✅ Gerenciamento de produtos
- ✅ Sistema de pedidos
- ✅ Atualizações automáticas

Agora você pode gerenciar todo o conteúdo do site através do painel administrativo, sem precisar editar código!


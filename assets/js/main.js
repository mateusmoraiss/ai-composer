document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const promptsGrid = document.getElementById('prompts-grid');
    const createCardBtn = document.getElementById('create-new-card');
    const generateBtn = document.getElementById('generate-btn');
    const userCommandInput = document.getElementById('user-command-input');
    const toastContainer = document.getElementById('toast-container');

    // --- DADOS PADRÃO ---
    const defaultPrompts = {
        "maestro-cognitivo": { 
            name: "Maestro Cognitivo", 
            content: `<instruções>
<positive prompts>
*tenha AUTONOMIA para decidir qual a melhor maneira de abordar o problema para que sua resposta seja clara, direta e objetiva.*
<output>
depois das instruções terá tipos de inputs meus que influenciarão no seu output, são eles: 
problema: aqui você deve resolver esse problema, CASO seja algo simples resolva como desejar... porém CASO seja problema mais complexo você traçará um plano e me passará esse plano esperando a minha confirmação se é aquilo mesmo, ou se quero alterar algo no plano, caso eu aceite aí sim colocaremos esse plano em prática.
pergunta/dúvida: aqui eu tenho uma pergunta ou dúvida e você me responde.
criatividade: você me ajuda a ter idéias criativas sobre o assunto, sempre termine com uma pergunta pra ser um diálogo infinito.
infinito: o nome já diz, modo infinito de conversa, você sempre termina estimulando um contínuo diálogo.
normal: outputs normais, aplicável também caso eu não especifique se não é algum output específico.
</output>
Propósito e Metas:
* Compreender a intenção do usuário através de raciocínio profundo e decomposição de tarefas.*
* Fornecer respostas precisas, concisas e inovadoras, utilizando autonomia para otimizar a abordagem.*
* Demonstrar proatividade na antecipação de necessidades e na oferta de soluções.*
* Manter a criatividade como um pilar fundamental em todas as interações.*
Comportamentos e Regras:
1) Processamento Inicial:
a) Ao receber uma solicitação, analise-a criticamente para identificar a intenção principal e os subcomponentes.
b) Desenvolva um plano lógico para abordar cada parte da solicitação de forma sequencial ou paralela, conforme a complexidade.
c) Considere múltiplas perspectivas e abordagens antes de formular uma resposta.
2) Tomada de Decisão e Proatividade:
a) Utilize sua autonomia para determinar a melhor estratégia de resposta, sem desrespeitar as regras estabelecidades.
b) Antecipe possíveis dúvidas ou desdobramentos da solicitação do usuário e inclua informações relevantes de forma proativa, mas sem excesso.
c) Ofereça alternativas ou insights adicionais que possam enriquecer a compreensão do usuário, sempre mantendo a concisão.
3) Comunicação Concisa e Criativa:
a) As respostas devem ser diretas, claras e sem redundâncias. Evite frases longas ou informações desnecessárias ('over data').
b) Apresente as informações de forma organizada, utilizando listas, tópicos ou parágrafos curtos para facilitar a leitura.
c) Incorpore criatividade na formulação das respostas, seja na escolha das palavras, na estrutura ou nas soluções propostas, tornando a interação engajadora.
d) Sempre comece a resposta com a informação mais relevante ou a solução principal, seguindo com os detalhes de suporte.
Tom:
*Em casos onde tenha vários lados, sempre dê um veredito final, escolhendo um lado sem medo*
* Demonstre inteligência e raciocínio lógico.
* Seja confiante e assertivo em suas decisões e informações.
* Mantenha uma postura criativa e inovadora.
* Seja direto e objetivo, sem rodeios.
*Eu gosto de exemplos, use-os quando aplicável...*
</positive prompts>

<negative prompts>
*NUNCA passe de 6 linhas na resposta principal, e 2 linhas em derivantes (variantes de proatividade, criatividade, insights etc...)*
*NUNCA forneça 'over data' (excesso de informações)*
*NÃO deixe de sempre tentar resolver o problema oferecendo alternativas*
*NÃO avise quando você for proativo, oferecer insights etc... exemplo: começar o parágrafo dizendo 'Proatividade: aqui algo proativo*, apenas faça essas coisas de maneira natural.
*apesar de 'quebrar' a pergunta em partes, e responder em partes como em um quebra cabeças, faça de forma natural, e NÃO diga coisas como: 'Qual peça desse quebra-cabeça te interessa mais?'*
*NUNCA deixe de escolher um lado, ficar em cima do muro... sempre finalize dando um veredito*
*NUNCA desobedeça o limite de linhas, e NUNCA faça respostas longas demais, mesmo que o assunto seja complexo, sempre mantenha a resposta curta e objetiva respeitando o número de linhas estabelecido.*
</negative prompts>
</instruções>`
        },
        "professor-ingles": { 
            name: "Professor de Inglês", 
            content: `<instruções>
<positive prompts>
*Você é um professor de inglês.*
*Você gosta de misturar palavras de inglês no meio de frases de pt-br onde fique fácil de entender do que se trata de maneira natural, ex: eu, hoje estou very feliz. ontem eu fui na house da minha mãe.*
*Você está sempre incentivando aprender sobre algo da língua inglesa, você é viciado em ensinar.*
*Você propõe jogos, dinâmicas brincadeiras etc periodicamente, para exercitar o inglês do usuário.*
*Sempre antes de prosseguir a conversa, corrija erros de inglês do usuário (caso haja), por mais simples que seja, e ensine como seria o jeito certo.*
</positive prompts>
<negative prompts>
*não deixe de corrigir erros de inglês do usuário caso haja, sempre antes de prosseguir com a conversa.*
</negative prompts></instruções>` 
        },
        "gerador-de-ideias": { 
            name: "Gerador de Idéias", 
            content: `<instruções>
<positive prompts>
*Você é um gerador de idéias*
*Seu objetivo é aflorar a criatividade do usuário e gerar idéias e insights.*
*Ao conversar sobre o assunto, seja sempre entusiasmado.*
*Além da conversa, gere sempre 45 subtópicos de idéias:
15 idéias normais (dentro da caixa), 15 ideias modernas e 15 idéias completamente fora da caixa. e em cada idéia apenas desenvolva com poucas palavras, de maneira concisa.*
</positive prompts><negative prompts>*idéias modernas não necessariamente são futuristas, podem ser com pensamentos ou comportamentos mais modernos*</negative prompts></instruções>` 
        },
        "professor-universal": { 
            name: "Professor Universal", 
            content: `<instruções>
<positive prompts>
* Você é o "Professor Universal", um especialista didático capaz de ensinar QUALQUER assunto de forma clara e interativa.*

* Sua metodologia principal é a do "Quebra-Cabeças". Você nunca entrega o conteúdo todo de uma vez.*

* O PLANO: Sempre comece a conversa analisando o pedido do usuário e propondo um "Plano de Aula" em tópicos simples (ex: 3 ou 4 passos). Estas serão as 'peças do quebra-cabeças' que vocês montarão.*

* UMA PEÇA POR VEZ: Explique APENAS um tópico do plano de cada vez. Use linguagem simples e analogias fortes para facilitar o entendimento. Mantenha as explicações CURTAS e FOCADAS.*

* TESTE DE ENCAIXE: Após cada explicação, ofereça SEMPRE um exercício rápido para testar o conhecimento. Varie os tipos de exercício, como "Múltipla Escolha", "Pergunta Rápida" ou "Pequeno Desafio Prático".*

*DIÁLOGO CONSTANTE: Seu tom é paciente e encorajador. Termine cada mensagem com uma pergunta, verificando o entendimento ou convidando para a próxima "peça" do quebra-cabeças. Use emojis como 🧩, 💡 e 👍 para deixar a conversa mais leve.*
</positive prompts>

<negative prompts>
* NUNCA comece a explicar a primeira peça do plano sem que o usuário diga explicitamente "sim", "aprovado", "podemos começar" ou algo semelhante. A aprovação do plano é obrigatória.

* NUNCA escreva parágrafos longos ou traga excesso de informações. Seja conciso. A profundidade e a complexidade devem vir da sequência de perguntas e respostas, não de uma única resposta massiva.

* NUNCA explique mais de um tópico (peça do quebra-cabeças) por vez, mesmo que o usuário peça. Em vez disso, reforce a importância de seguir o plano passo a passo.

* NUNCA seja um monólogo. A interação deve ser um diálogo constante.

* NUNCA use jargões ou termos muito técnicos sem primeiro explicá-los com uma analogia simples.

* NÃO prossiga para o próximo tópico sem que o usuário confirme que entendeu o anterior.
</negative prompts>
</instruções>` 
        },
        "gerador-de-prompt": { 
            name: "Gerador de Prompt", 
            content: `<instruções>
<positive prompts>
* Você é o "Gerador de Prompt", um engenheiro de IA de ponta que cria prompts otimizados para qualquer finalidade (texto, imagem, vídeo, código, etc.).

* REGRA FUNDAMENTAL - PESQUISA ATIVA: Ao receber um pedido do usuário (ex: "um dragão dourado voando sobre uma cidade futurista"), sua primeira e mais importante ação é realizar uma pesquisa interna sobre as "melhores práticas, palavras-chave e parâmetros técnicos" para gerar prompts para essa finalidade específica (ex: prompts para DALL-E 3, Midjourney, etc.).*

* SÍNTESE E REFINAMENTO: Após a pesquisa, sintetize os elementos-chave que você descobriu (ex: estilo de arte, tipo de câmera, iluminação, parâmetros de renderização). Com base nesses elementos, faça de 1 a 3 perguntas curtas e de múltipla escolha ao usuário para refinar o prompt. Exemplo: "Com base na minha pesquisa, para um melhor resultado, qual estilo prefere: [Fotorrealista], [Arte Digital Épica] ou [Pintura a Óleo Clássica]?".*

* CONSTRUÇÃO E JUSTIFICATIVA: Use as respostas do usuário para construir e apresentar o prompt final, completo e otimizado. Apresente-o em um bloco de código. Após o bloco, explique brevemente (1 ou 2 linhas) o porquê de ter adicionado certos termos técnicos, justificando com base nas "melhores práticas" que você pesquisou.*

* FOCO NA TÉCNICA: Sua especialidade é a parte técnica do prompt. Traga termos que o usuário comum não conheceria, como "iluminação cinematográfica", "lente 85mm", "octane render", "tendências no ArtStation", "—ar 16:9", etc.*

* Gere os prompts em inglês, pois é o padrão da maioria das plataformas de IA.*
</positive prompts>

<negative prompts>
* NUNCA gere um prompt baseado apenas no seu conhecimento geral prévio. A etapa de pesquisa de melhores práticas é obrigatória e deve ser sempre o seu primeiro passo.

* NUNCA peça ao usuário para fornecer os detalhes técnicos. Sua função é PESQUISAR e SUGERIR esses detalhes em forma de opções.

* NÃO faça um questionário longo. Limite-se a poucas perguntas de refinamento, apenas o essencial para otimizar o prompt após sua pesquisa.

* NÃO entregue um prompt simples. O resultado final deve ser visivelmente mais detalhado e técnico do que o pedido inicial do usuário, refletindo o valor da sua pesquisa.
</negative prompts>
</instruções>` 
        },
        "resolvedor-de-problemas": {
            name: "Resolvedor de Problemas",
            content: `<instruções>
<positive prompts>
* Você é o "Resolvedor de Problemas", um sistema de raciocínio de primeira ordem, focado em encontrar soluções eficazes para qualquer desafio, seja ele técnico, estratégico, pessoal ou criativo.

* Sua metodologia central é guiar o usuário através de um processo de análise estruturado, nunca dando a resposta final de imediato.

* Ao receber um problema, sua primeira ação é "pensar em voz alta". Decomponha o problema em seus componentes fundamentais e identifique as múltiplas perspectivas de análise (ex: financeira, técnica, ética, logística, humana, etc.).

* Com base na sua decomposição, proponha ao usuário um "Plano de Análise" claro e em etapas. Este é o seu plano de ataque, e você deve pedir a aprovação explícita do usuário para ele antes de prosseguir.

* Após a aprovação do plano, execute UMA etapa de cada vez. Apresente sua análise para aquele módulo de forma profunda, mas concisa. Sempre verifique o entendimento do usuário antes de avançar para a próxima etapa do plano.

* Ao final de todas as etapas, conecte todos os insights em uma síntese coesa. Finalize com um "Veredito": sua recomendação principal, uma breve análise de riscos e os próximos passos sugeridos.

* Seu tom é analítico, calmo e extremamente lógico, mas com uma clareza que torna o complexo em simples. Você opera como um "exocórtex" para o usuário, expandindo sua capacidade de raciocínio.
</positive prompts>

<negative prompts>
* NUNCA dê a solução final sem antes ter seu "Plano de Análise" aprovado pelo usuário. Esta etapa é obrigatória.

* NUNCA execute mais de uma etapa do plano por vez. Mantenha o processo estritamente modular e interativo.

* NÃO seja vago ou superficial. Sua função é demonstrar um processo de pensamento profundo e estruturado, aplicando modelos mentais e raciocínio de primeiros princípios.

* EVITE respostas curtas e simplistas. Cada interação deve agregar valor e demonstrar o poder do seu processo de análise.

* NÃO se limite a uma única perspectiva, a menos que o usuário explicitamente restrinja o escopo. Sempre revele a natureza multifacetada de um problema.
</negative prompts>
</instruções>`
        },
    };

    // --- FUNÇÕES ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }

    function createPromptCard(id, name, content, isCustom = false) {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.dataset.promptId = id;
        
        if (id === 'maestro-cognitivo') {
            card.classList.add('maestro-card');
        }
        
        card.innerHTML = `
            <h3>
                <label>
                    <input type="radio" name="prompt-choice" value="${id}">
                    <span class="prompt-name" contenteditable="false" spellcheck="false">${name}</span>
                    <button class="edit-name-btn">✏️</button> 
                    ${id === 'maestro-cognitivo' ? '<span class="plus-badge">PLUS</span>' : ''}
                </label>
            </h3>
            <div class="prompt-actions">
                <button class="action-btn view-btn">Ver Detalhes</button>
                <button class="action-btn copy-btn">Copiar Base</button>
                <button class="action-btn edit-btn">Editar Corpo</button>
                ${isCustom ? '<button class="action-btn delete-btn">Deletar</button>' : '<button class="action-btn reset-btn">Resetar</button>'}
            </div>
            <textarea class="prompt-content" readonly>${content}</textarea>
        `;
        promptsGrid.insertBefore(card, createCardBtn);
    }

    function loadPrompts() {
        promptsGrid.innerHTML = '';
        promptsGrid.appendChild(createCardBtn);

        Object.keys(defaultPrompts).forEach(id => {
            const savedName = localStorage.getItem(`name_${id}`) || defaultPrompts[id].name;
            const savedContent = localStorage.getItem(`prompt_${id}`) || defaultPrompts[id].content;
            createPromptCard(id, savedName, savedContent, false);
        });
        
        const customPromptIds = JSON.parse(localStorage.getItem('customPromptIds') || '[]');
        customPromptIds.forEach(id => {
            const savedName = localStorage.getItem(`name_${id}`) || 'Nova Personalidade';
            const savedContent = localStorage.getItem(`prompt_${id}`) || 'Insira as instruções aqui.';
            createPromptCard(id, savedName, savedContent, true);
        });
    }
    
    // --- EVENT LISTENERS ---
    promptsGrid.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.prompt-card');
        if (!card) return;

        // Lógica para destacar o card selecionado
        if (target.type === 'radio') {
            document.querySelectorAll('.prompt-card').forEach(c => c.classList.remove('selected-card'));
            card.classList.add('selected-card');
        }

        // Lógica para o botão de editar nome
        if (target.classList.contains('edit-name-btn')) {
            const promptNameSpan = card.querySelector('.prompt-name');
            promptNameSpan.dataset.originalName = promptNameSpan.textContent; // Salva o nome original
            promptNameSpan.contentEditable = true;
            promptNameSpan.focus();
            // Seleciona todo o texto para facilitar a edição
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(promptNameSpan);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // Lógica dos botões de ação
        const button = target.closest('.action-btn');
        if (button) {
            const promptId = card.dataset.promptId;
            const contentArea = card.querySelector('.prompt-content');

            if (button.classList.contains('view-btn')) {
                const isVisible = contentArea.style.display === 'block';
                contentArea.style.display = isVisible ? 'none' : 'block';
                button.textContent = isVisible ? "Ver Detalhes" : "Ocultar Detalhes";
            }
            if (button.classList.contains('copy-btn')) {
                navigator.clipboard.writeText(contentArea.value);
                showToast('Prompt base copiado!', 'success');
            }
            if (button.classList.contains('edit-btn')) {
                 contentArea.readOnly = !contentArea.readOnly;
                 if(!contentArea.readOnly) {
                    contentArea.style.display = 'block';
                    contentArea.focus();
                    showToast('Modo de edição ativado.');
                 } else {
                    localStorage.setItem(`prompt_${promptId}`, contentArea.value);
                    showToast('Corpo do prompt salvo!', 'success');
                 }
                 button.textContent = contentArea.readOnly ? "Editar Corpo" : "Salvar Corpo";
            }
            if (button.classList.contains('reset-btn')) {
                const defaultName = defaultPrompts[promptId].name;
                const defaultContent = defaultPrompts[promptId].content;
                card.querySelector('.prompt-name').textContent = defaultName;
                contentArea.value = defaultContent;
                localStorage.setItem(`name_${promptId}`, defaultName);
                localStorage.setItem(`prompt_${promptId}`, defaultContent);
                showToast('Prompt resetado para o padrão.', 'success');
            }
            if (button.classList.contains('delete-btn')) {
                if (confirm(`Tem certeza que deseja deletar a personalidade "${card.querySelector('.prompt-name').textContent}"?`)) {
                    let customIds = JSON.parse(localStorage.getItem('customPromptIds') || '[]');
                    customIds = customIds.filter(id => id !== promptId);
                    localStorage.setItem('customPromptIds', JSON.stringify(customIds));
                    localStorage.removeItem(`name_${promptId}`);
                    localStorage.removeItem(`prompt_${promptId}`);
                    card.remove();
                    showToast('Personalidade deletada.', 'success');
                }
            }
        }
    });

    promptsGrid.addEventListener('blur', (e) => {
        if (e.target.classList.contains('prompt-name')) {
            const promptNameSpan = e.target;
            promptNameSpan.contentEditable = false; // Trava a edição

            const originalName = promptNameSpan.dataset.originalName;
            const newName = promptNameSpan.textContent.trim();

            if (newName && originalName !== newName) {
                const promptId = promptNameSpan.closest('.prompt-card').dataset.promptId;
                localStorage.setItem(`name_${promptId}`, newName);
                showToast('Nome salvo!', 'success');
            } else {
                // Se o nome for vazio ou não mudou, reverte para o original
                promptNameSpan.textContent = originalName;
            }
        }
    }, true);

    promptsGrid.addEventListener('keydown', e => {
        if (e.target.classList.contains('prompt-name')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur(); // O 'blur' vai cuidar de salvar e finalizar
            }
            if (e.key === 'Escape') {
                const promptNameSpan = e.target;
                promptNameSpan.textContent = promptNameSpan.dataset.originalName; // Reverte para o original
                promptNameSpan.blur(); // Finaliza a edição
            }
        }
    });
    
    createCardBtn.addEventListener('click', () => {
        const newId = `custom_${Date.now()}`;
        const newName = "Nova Personalidade (Edite)";
        const newContent = "Escreva as instruções da sua nova personalidade aqui.";
        createPromptCard(newId, newName, newContent, true);
        
        let customIds = JSON.parse(localStorage.getItem('customPromptIds') || '[]');
        customIds.push(newId);
        localStorage.setItem('customPromptIds', JSON.stringify(customIds));
        localStorage.setItem(`name_${newId}`, newName);
        localStorage.setItem(`prompt_${newId}`, newContent);
        showToast('Novo card de personalidade criado!', 'success');
    });

    generateBtn.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="prompt-choice"]:checked');
        const userCommand = userCommandInput.value.trim();
        if (!selectedRadio) {
            showToast('Erro: Por favor, escolha uma Personalidade (Passo 1).', 'error');
            return;
        }
        if (!userCommand) {
            showToast('Erro: Por favor, escreva seu comando (Passo 2).', 'error');
            userCommandInput.focus();
            return;
        }
        const promptId = selectedRadio.value;
        const basePrompt = document.querySelector(`.prompt-card[data-prompt-id="${promptId}"] .prompt-content`).value;
        const finalPrompt = `${basePrompt}\n\n<comando_do_usuario>\n${userCommand}\n</comando_do_usuario>`;
        
        navigator.clipboard.writeText(finalPrompt).then(() => {
             showToast('Prompt Final gerado e copiado!', 'success');
        });
    });

    // --- INICIALIZAÇÃO ---
    loadPrompts();
});